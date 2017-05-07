import Vue from 'vue'
import store from './store'
import App from './App'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.prototype.$audio = new (window.AudioContext || window.webkitAudioContext)()

// register widgets
Vue.component('app-card', require('@/components/widgets/Card'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store
})
