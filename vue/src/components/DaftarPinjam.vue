<template>
  <div class="posts">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">DAFTAR PINJAMAN</div>
            <div class="card-body">
              <hr />
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
                      <td>{{ book.kategori }}</td>
                      <td class="text-center">
                        <b-button
                          @click="PostReturn(id_pinjam)"
                          variant="primary"
                          >KEMBALIKAN BUKU</b-button
                        >
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
    <!-- {{books}}
    {{id_pinjam}} -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      username: window.sessionStorage.getItem("username"),
      id_pinjam: null,
    };
  },
  mounted() {
    this.getPinjaman();
  },

  methods: {
    getPinjaman() {
      axios
        .get("http://localhost:8091/api/pinjam/" + this.username, {
          params: {
            token: window.sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.books = response.data.data;
          this.id_pinjam = response.data.id_pinjam;
        })
        .catch((error) => {
          this.validation = error.response.data;
        });
    },
    PostReturn(id) {
      axios
        .delete("http://localhost:8091/api/pinjam/" + id, {
          params: {
            token: window.sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.getPinjaman();
          window.sessionStorage.setItem("kondisi", "1");
          this.$router.push({
            name: "Home",
          });
          this.$router.go(0);
          this.books.splice(this.books.indexOf(id), 1);
          console.log(response.data);
        })
        .catch((error) => {
          this.validation = error.response.data;
        });
    },
  },
};
</script>