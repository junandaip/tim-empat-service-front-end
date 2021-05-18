<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Psr\Log\LoggerInterface;
// require _DIR_ . '/vendor/autoload.php';
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;

use App\Models\Peminjaman;
use App\Models\Book;
use App\Models\User;

class PeminjamanController extends Controller
{
    public function showPinjaman(Request $request, $username)
    {
        $session = $request->session();
        $pinjaman = Peminjaman::where('username', $username)->first();
        if ($pinjaman) {
            $buku = Book::where('id', $pinjaman->id_buku)->first();
            return response()->json([
                'data'=>['buku' => $buku],
                'id_pinjam'=> [$pinjaman->id]
            ], 200);
        } else {
            return response()->json([
                'message' => 'Anda Belum meminjam'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $session = $request->session();
        $this->validate($request, [
            'username' => 'required',
            'id_buku' => 'required'
        ]);

        $pinjaman = Peminjaman::create(
            $request->only(['username', 'id_buku'])
        );

        $buku = Book::where('id', $request->id_buku)->first();
        $stok = $buku->stock - 1;
        Book::where('id', $request->id_buku)
            ->update(['stock' => $stok]);

        User::where('username', $request->username)
            ->update(['kondisi' => 0]);

        return response()->json([
            'created' => true,
            'data' => $pinjaman
        ], 201);
    }


    public function destroy(Request $request, $id)
    {
        $session = $request->session();
        try {
            $pinjaman = Peminjaman::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => [
                    'message' => 'anda belum meminjam'
                ]
            ], 404);
        }

        $pinjaman->delete();

        $buku = Book::where('id', $pinjaman->id_buku)->first();
        $stok = $buku->stock + 1;
        Book::where('id', $pinjaman->id_buku)
            ->update(['stock' => $stok]);

        User::where('username', $pinjaman->username)
            ->update(['kondisi' => 1]);

        return response()->json([
            'deleted' => true
        ], 200);
    }
}
