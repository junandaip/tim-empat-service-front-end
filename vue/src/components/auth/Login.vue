<template>
  <div class="posts">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="card-title text-center">Login</div>
            <br />
            <form @submit.prevent="Login">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="post.username"
                  placeholder="Username"
                />
                <div v-if="validation.username">
                  <div class="alert alert-danger mt-1" role="alert">
                    {{ validation.username[0] }}
                  </div>
                </div>
              </div>
              <br />
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  v-model="post.password"
                  placeholder="Password"
                />
                <div v-if="validation.password">
                  <div class="alert alert-danger mt-1" role="alert">
                    {{ validation.password[0] }}
                  </div>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="inlineFormCheck"/>
                    <label class="form-check-label mb-3" for="inlineFormCheck">Remember me</label>
                  </div>
                </div>
                <div class="col">
                  <button type="submit" class="btn btn-md btn-primary mr-2 pull-right">Login</button>
                </div>
              </div>
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
      post: {},
      validation: [],
    };
  },
  methods: {
    Login() {
      axios
        .post("http://localhost:9000/api/login", this.post)
        .then((response) => {
          console.log(response.data.result.token);
          console.log(response.data.result.kondisi);
          console.log(response.data.result.role);
          window.sessionStorage.setItem("username", this.post.username);
          window.sessionStorage.setItem("token", response.data.result.token);
          window.sessionStorage.setItem(
            "kondisi",
            response.data.result.kondisi
          );
          window.sessionStorage.setItem("role", response.data.result.role);
          this.$router.push({
            name: "Home",
          });
          this.$router.go();
        })
        .catch((error) => {
          this.validation = error.response.data;
        });
    },
  },
};
</script>