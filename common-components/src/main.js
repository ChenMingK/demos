import Vue from 'vue'
import App from './App.vue'
import './utils/create-api'
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
