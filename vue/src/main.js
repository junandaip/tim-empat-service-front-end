import Vue from 'vue'
import App from './App.vue'
//import Vue Router
import VueRouter from 'vue-router'

//menggunkan Vue Router di Vue JS
Vue.use(VueRouter);

//import components
import PostsIndex from './components/auth/Login'
import PostsCreate from './components/auth/Regist'

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
      component: PostsIndex
    },
    {
      path: '/regist',
      name: 'regist',
      component: PostsCreate
    }
  ],
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')