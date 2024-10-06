import './assets/main.css'
import '@/styles/vars.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import globalComponentsPlugin from '@/plugins/globalComp.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(globalComponentsPlugin)

app.mount('#app')
