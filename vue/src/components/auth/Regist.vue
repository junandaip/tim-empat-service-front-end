<template>
  <div class="posts">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="card-title text-center">Register</div>
            <br />
            <form @submit.prevent="Register">
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
                <div class="col" style="text-align: left">
                  <router-link class="nav-link" to="/login"
                    >Sudah punya akun?</router-link
                  >
                </div>
                <div class="col">
                  <button type="submit" class="btn btn-md btn-primary mr-2 pull-right">
                    Register
                  </button>
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
    Register() {
      axios
        .post("http://localhost:9000/api/register", this.post)
        .then((response) => {
          this.$router.push({
            name: "login",
          });
          console.log(response.data.data);
        })
        .catch((error) => {
          this.validation = error.response.data.data;
        });
    },
  },
};
</script>