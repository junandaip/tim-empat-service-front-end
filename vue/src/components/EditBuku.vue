<template>
    <div>
        <form @submit.prevent="submitForm">
            <h2>EDIT BUKU</h2>
            <label>Judul Buku: </label>
            <input
                type="text"
                name="judul"
                id="judul"
                placeholder="Judul Buku"
                required
                v-model="books.judul"
            />
            <label>Penulis Buku: </label>
            <input
                type="text"
                name="penulis"
                id="books.penulis"
                placeholder="Penulis Buku"
                required
                v-model="books.penulis"
            />
            <label>Kategori Buku: </label>
            <input
                type="text"
                name="kategori"
                id="kategori"
                placeholder="Kategori Buku"
                required
                v-model="books.kategori"
            />
            <label>Stock Buku: </label>
            <input
                type="number"
                name="stock"
                id="stock"
                placeholder="Stock Buku"
                required
                v-model="books.stock"
            />
            <br />
            <!-- <div class="submit">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div> -->
            <div class="submit" >
                <button type="submit" class="btn btn-md btn-success mx-3">Update</button>
                <a class="btn btn-danger" href="/" role="button">Cancel</a>
            </div>
        </form>
    <!-- {{books}} -->
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      books: []
    };
  },
  created(){
      axios.get(`https://tim-empat-api-gateway.herokuapp.com/api/book/id/${this.$route.params.id}`, {
          params: {
              token: window.sessionStorage.getItem("token"),
          },
      })
      .then((response) => {
        this.books = response.data.result.data
      });
  },
  methods: {
    submitForm() {
      axios
        .put(`https://tim-empat-api-gateway.herokuapp.com/api/book/${this.$route.params.id}`, this.books, {
          params: {
            token: window.sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.$router.push({
            name: "Index"
          });
          this.$router.go(0);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
form {
  max-width: 520px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: grey;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
.submit {
  text-align: center;
}

</style>