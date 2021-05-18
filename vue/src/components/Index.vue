<template>
  <div class="posts">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">DAFTAR BUKU</div>
            <div class="card-body">
              <hr />
              <div class="table-responsive mt-2">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr style='text-align:center; vertical-align:middle'>
                      <th>JUDUL</th>
                      <th>PENULIS</th>
                      <th>KATEGORI</th>
                      <th>STOCK</th>
                      <th>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="book in books" :key="book.id" style='text-align:center; vertical-align:middle'>
                      <td>{{ book.judul }}</td>
                      <td>{{ book.penulis }}</td>
                      <td>{{ book.kategori }}</td>
                      <td>{{ book.stock }}</td>
                      <td class="text-center">
                        <b-button @click="pinjamBuku(book.id)" variant="primary"
                          >Pinjam Buku</b-button>
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

<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      username: window.sessionStorage.getItem("username")
    };
  },
  mounted() {
    this.getBuku();
  },
  methods: {
    getBuku() {
      axios
        .get("http://localhost:8091/api/book", {
          params: {
            token:
              "As5PQrl9b3Q7jQWlSdSHBdn2qlWeeJs1ZlsdCufEdX7gxixdAqnhidL2oq43KY5fsgcEdVq6dTVPQu3T",
          },
        })
        .then((response) => {
            this.books = response.data
        })
        .catch((error) => {
          this.validation = error.response.data;
        });
    },
    pinjamBuku(id){
        axios
            .post("http://localhost:8091/api/pinjam/",{
                    username: this.username,
                    id_buku: id
                },
                {
                params: {
                    token: "As5PQrl9b3Q7jQWlSdSHBdn2qlWeeJs1ZlsdCufEdX7gxixdAqnhidL2oq43KY5fsgcEdVq6dTVPQu3T"
                }
            })
            .then((response) => {
                this.getBuku();
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
  },
};
</script>