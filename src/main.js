import './assets/index.css'

import axios from 'axios'
import 'sweetalert2/dist/sweetalert2.min.css'
import { createApp } from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

const options = {
  showConfirmButton: false,
  toast: true,
  position: 'top-right',
  showCloseButton: true,
  timer: 3000
}

app.use(VueSweetalert2, options)
app.use(router)
app.use(store)

app.mixin({
  created() {
    const vm = this
    axios.interceptors.response.use(undefined, function (error) {
      if (error.response?.status === 401) {
        store.dispatch('logout')
        router.push({ name: 'login' })
      } else if (error.response?.status === 403) {
        router.push({ name: 'forbidden' })
      } else if (error.response?.status >= 500 && error.response?.status !== 503) {
        vm.$swal({
          title: 'error',
          text: 'Unknown error occurred.'
        })
      }

      return Promise.reject(error)
    })
  }
})

app.mount('#app')
