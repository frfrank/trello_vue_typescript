import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { makeServer } from './server'
import '@/config/axiosConfig'

import App from './App.vue'
import router from './router'
import i18n from '@/config/i18n'
import FontAwesomeIcon from '@/config/fontawesomeIcons'

import './assets/styles/app.scss'

if (import.meta.env.MODE === 'dev') {
  makeServer()
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.component('Icon', FontAwesomeIcon)
app.mount('#app')
