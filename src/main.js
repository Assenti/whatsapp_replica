import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/all.scss'
import VueSocketIO from 'vue-socket.io'
import FormField from './components/FormField'
import Icon from './components/Icon'
import Btn from './components/Btn'
import Toast from './components/Toast'
import VeeValidate from 'vee-validate'
import { backendService } from './services/backendService'
import config from '../config'
// import 'materialize-css/dist/css/materialize.min.css'

Vue.use(VeeValidate)
Vue.use(new VueSocketIO({
    debug: true,
    connection: config.devHost
}))

Vue.prototype.$backend = backendService
Vue.prototype.$http = backendService.http
Vue.config.productionTip = false
Vue.component('form-field', FormField)
Vue.component('btn', Btn)
Vue.component('icon', Icon)
Vue.component('toast', Toast)

export const bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
