<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Kunglao Library</router-link>
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
            <router-link class="nav-link" to="/">Home</router-link>
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
        <div v-if="username">
          <li class="nav-item">
            <router-link class="nav-link" to="/logout">Logout</router-link>
          </li>
        </div>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Create' }"
            >Create</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Peminjaman' }"
            >Peminjaman</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      username: window.sessionStorage.getItem("username"),
    };
  },
};
</script>