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
                    <tr style="text-align: center; vertical-align: middle">
                      <th>JUDUL</th>
                      <th>PENULIS</th>
                      <th>KATEGORI</th>
                      <th>STOCK</th>
                      <div v-if="kondisi === '1'">
                        <th>AKSI</th>
                      </div>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="book in books"
                      :key="book.id"
                      style="text-align: center; vertical-align: middle"
                    >
                      <td>{{ book.judul }}</td>
                      <td>{{ book.penulis }}</td>
                      <td>{{ book.kategori }}</td>
                      <td>{{ book.stock }}</td>
                      <div v-if="role === '1'">
                        <div v-if="kondisi === '1' && book.stock > 0">
                          <td class="text-center">
                            <b-button
                              @click="pinjamBuku(book.id)"
                              variant="primary"
                              >Pinjam Buku</b-button
                            >
                          </td>
                        </div>
                        <div v-if="kondisi === '1' && book.stock == 0">
                          <td class="text-center">
                            <b-button disabled variant="secondary">Stok Habis</b-button>
                          </td>
                        </div>
                      </div>
                      <div v-if="role === '2'">
                        <td class="text-center">
                          <router-link
                            :to="{ name: 'Edit', params: { id: book.id } }"
                            class="btn btn-sm btn-success mx-2"
                            >Edit</router-link
                          >
                          <button
                            @click="PostDelete(book.id)"
                            class="btn btn-sm btn-danger"
                          >
                            Hapus
                          </button>
                        </td>
                      </div>
                    </tr>
                  </tbody>
                </table>
                <p>token : {{ token }} </p>
                <p>username : {{ username }} </p>
                <p>kondisi : {{ kondisi }} </p>
                <p>role : {{ role }} </p>

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
      token: sessionStorage.getItem("token"),
      books: [],
      username: window.sessionStorage.getItem("username"),
      kondisi: window.sessionStorage.getItem("kondisi"),
      role: window.sessionStorage.getItem("role"),
    };
  },
  mounted() {
    this.getBuku();
  },
  methods: {
    getBuku() {
      axios
        .get("http://localhost:9000/api/book", {
          params: {
            token: window.sessionStorage.getItem("token")
          },
        })
        .then((response) => {
          this.books = response.data.result;
        })
        .catch((error) => {
          this.validation = error.response.data;
        });
    },
    pinjamBuku(id) {
      axios
        .post(
          "http://localhost:9000/api/pinjam/",
          {
            username: this.username,
            id_buku: id,
          },
          {
            params: {
              token: window.sessionStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.getBuku();
          console.log(response);
          this.$router.go(0);
          window.sessionStorage.setItem("kondisi", "0");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    PostDelete(id) {
      if (confirm("Hapus Buku?")) {
        axios
          .delete("http://localhost:9000/api/book/" + id, {
            params: {
              token: window.sessionStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.$router.push({
              name: "Home",
            });
            this.books.splice(this.books.indexOf(id), 1);
            console.log(response.data);
          })
          .catch((error) => {
            this.validation = error.response.data;
          });
      }
    },
  },
};
</script>