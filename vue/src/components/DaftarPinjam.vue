<template>
    <div class="posts">
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            DAFTAR PINJAMAN
                        </div>
                        <div class="card-body">
                            <hr>
                            <div class="table-responsive mt-2">
                                <table class="table table-hover table-bordered">
                                    <thead>
                                    <tr>
                                        <th>JUDUL</th>
                                        <th>PENULIS</th>
                                        <th>KATEGORI</th>
                                        <th>AKSI</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="book in books" :key="book.id">
                                        <td>{{ book.judul }}</td>
                                        <td>{{ book.penulis }}</td>
                                        <td>{{ book.stock }}</td>
                                        <td class="text-center">
                                            <b-button @click="PostReturn(book.id)" variant="primary">KEMBALIKAN BUKU</b-button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

// <script>
//     import axios from "axios";

//     export default {
//         data() {
//             return {
//                 books: [],
//             };
//         },
//         mounted() {
//             PostReturn(){
//                 axios
//                     .post('')
//                     .then((response) => {
//                         console.log(response.data);
//                     })
//                     .catch((error) => {
//                         this.validation = error.response.data;
//                 });
//             }
//         },
//         methods: {
            
//         }
//     };
// </script>