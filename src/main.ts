import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@/assets/css/index.less'
import router from './router'
import store from './store'
import icons from './global/register-icons'

const app = createApp(App)

console.log('22222')
console.log('1111')

app.use(icons).use(store).use(router).mount('#app')
