import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/all.scss'
import VueSocketIO from 'vue-socket.io'
import FormField from './components/FormField'
import Icon from './components/Icon'
import Btn from './components/Btn'
import VeeValidate from 'vee-validate'
import { backendService } from './services/backendService'

Vue.use(VeeValidate)
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000'
}))

Vue.prototype.$backend = backendService
Vue.config.productionTip = false
Vue.component('form-field', FormField)
Vue.component('btn', Btn)
Vue.component('icon', Icon)

export const bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
