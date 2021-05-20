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
        .post("https://tim-empat-api-gateway.herokuapp.com/api/logout", {
          username: this.username,
        })
        .then((response) => {
          console.log(response.data.data);
          window.sessionStorage.removeItem("username");
          window.sessionStorage.removeItem("token");
          window.sessionStorage.removeItem("kondisi");
          window.sessionStorage.removeItem("role");
          console.log(window.sessionStorage.getItem("username"));
          this.$router.push({
            name: "login",
          });
          this.$router.go();
        })
        .catch((error) => {
          this.validation = error.response.data.data;
        });
    },
  },
};
</script>