import Vue from 'vue'
import App from './App.vue'
//import Vue Router
import VueRouter from 'vue-router'

//menggunkan Vue Router di Vue JS
Vue.use(VueRouter);

//import components
import Login from './components/auth/Login'
import Regist from './components/auth/Regist'
import Logout from './components/auth/Logout'
import Index from './components/Index.vue'
import CreateBook from './components/CreateBook.vue'
import PinjamBuku from './components/DaftarPinjam.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/regist',
      name: 'regist',
      component: Regist
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/',
      name: 'Home',
      component: Index
    },
    {
      path: '/create',
      name: 'Create',
      component: CreateBook
    },
    {
      path: '/pinjam',
      name: 'Peminjaman',
      component: PinjamBuku
    }
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')