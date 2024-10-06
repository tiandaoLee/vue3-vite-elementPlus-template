import './assets/main.css'
import '@/styles/vars.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { setupRouter } from './router.js'
import globalComponentsPlugin from '@/plugins/globalComp.js'

const app = createApp(App)

app.use(createPinia())
setupRouter(app)

app.use(globalComponentsPlugin)

app.mount('#app')
