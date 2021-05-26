import Vue from 'vue'
import App from './App.vue'
//import Vue Router
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics';

//menggunkan Vue Router di Vue JS
Vue.use(VueRouter);

//import components
import Login from './components/auth/Login'
import Regist from './components/auth/Regist'
import Index from './components/Index.vue'
import CreateBook from './components/CreateBook.vue'
import PinjamBuku from './components/DaftarPinjam.vue'
import EditBuku from './components/EditBuku.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: 'UA-197916370-1',
  VueRouter
});

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/regist',
      name: 'regist',
      component: Regist
    },
    {
      path: '/',
      name: 'Home',
      component: Index,
      meta: {
        auth: true,
      },
    },
    {
      path: '/create',
      name: 'Create',
      component: CreateBook,
      meta: {
        auth: true,
      },
    },
    {
      path: '/pinjam',
      name: 'Peminjaman',
      component: PinjamBuku,
      meta: {
        auth: true,
      },
    },
    {
      path: '/edit',
      name: 'Edit',
      component: EditBuku,
      meta: {
        auth: true,
      },
    },
  ],
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (!sessionStorage.getItem("token")) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')