import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import createApp from './create-app.js'
import {gaDevId as gaDevelopmentId, gaProductionId} from '../config/config.js'

const {app, router} = createApp()

Vue.use(VueAnalytics, {
  id: (process.env.NODE_ENV === 'development') ? gaDevelopmentId : gaProductionId,
  router,
})

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }, function(error) {
      console.log('ServiceWorker registration failed: ', error)
    })
  })
}

router.onReady(() => {
  app.$mount('#app')
})
