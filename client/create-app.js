import Vue from 'vue'

import App from './layouts/app.vue'
import createStore from './store.js'
import createRouter from './routes.js'

import VueMeta from 'vue-meta'

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
})

export default () => {
  const store = createStore()
  const router = createRouter()

  const app = new Vue({
    router,
    store,
    ...App,
  })

  return {
    app,
    router,
    store,
  }
}
