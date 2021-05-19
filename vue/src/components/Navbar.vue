<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand mx-3" to="/">Kunglao Library</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <div v-if="username">
          <li class="nav-item">
            <router-link class="nav-link">Home</router-link>
          </li>
        </div>
      </ul>
      <ul class="navbar-nav">
        <div v-if="!username">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </div>
        <div v-if="!username">
          <li class="nav-item">
            <router-link class="nav-link" to="/regist">Register</router-link>
          </li>
        </div>
        <div v-if="role === '2'">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Create' }"
              >Create</router-link
            >
          </li>
        </div>
        <div v-if="role === '1'">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Peminjaman' }"
              >Peminjaman</router-link
            >
          </li>
        </div>
        <div v-if="username">
          <li class="nav-item">
            <!-- <router-link class="nav-link" to="/logout">Logout</router-link> -->
            <b-button
              class="text-decoration-none"
              style="color: #4d4d4d"
              variant="link"
              id="show-btn"
              @click="showModal"
              >Logout</b-button
            >

            <b-modal ref="my-modal" hide-footer title="Yakin Logout?">
              <div class="col-md-12 text-center">
                <b-button block variant="danger" @click="Logout">Logout</b-button>
                <b-button block variant="primary mx-2" @click="hideModal">Cancel</b-button>
              </div>
            </b-modal>
          </li>
        </div>
      </ul>
    </div>
  </nav>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      username: window.sessionStorage.getItem("username"),
      role: window.sessionStorage.getItem("role"),
      kondisi: window.sessionStorage.getItem("kondisi"),
    };
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    Logout() {
      axios
        .post("http://localhost:8091/api/logout", {
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