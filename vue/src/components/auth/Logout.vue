<template>
  <div class="posts">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="card-title text-center">Logout</div>
            <br />
            <form @submit.prevent="Logout">
              <button type="submit" class="btn btn-md btn-primary mr-2">
                Gas
              </button>
            </form>
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
      username: window.sessionStorage.getItem("username"),
    };
  },
  methods: {
    Logout() {
      axios
        .post("http://localhost:8000/api/logout", {
          username: this.username,
        })
        .then((response) => {
          this.$router.push({
            name: "login",
          });
          this.$router.go();
          console.log(response.data.data);
          window.sessionStorage.removeItem("username");
          window.sessionStorage.removeItem("token");
          console.log(window.sessionStorage.getItem("username"));
        })
        .catch((error) => {
          this.validation = error.response.data.data;
        });
    },
  },
};
</script>