import Vue from 'vue'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './Vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './routes';
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
