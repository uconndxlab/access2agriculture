import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
  if ( !app ) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})

