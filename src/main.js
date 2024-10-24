import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import VITE_FIREBASE_API_KEY from '.env'

// toast
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
})

import { AUTH } from '@/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

let app;

onAuthStateChanged(AUTH, ()=> {
  if(!app) {
    app = createApp(App)
      .use(createPinia())
      .use(router)
      .use(vuetify)
      .use(ToastPlugin)
      .mount('#app')
  }
})
