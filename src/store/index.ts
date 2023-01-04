import { createPinia } from 'pinia'
import type { App } from 'vue'
import userLogin from './login'

const pinia = createPinia()

function registerStore(app: App<Element>) {
  app.use(pinia)

  const loginStore = userLogin()
  loginStore.flushFromMapMenuAction()
}

export default registerStore
