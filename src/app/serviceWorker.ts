import { translate } from '../i18n/index'

/** 注册 Service Worker；有新版本在等待时提示刷新。 */
export const setupServiceWorker = () => {
  if (__DEV__ || !('serviceWorker' in navigator)) {
    return
  }

  let updating = false
  const hasController = Boolean(navigator.serviceWorker.controller)

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (updating) {
      window.location.reload()
    }
  })

  const promptUpdate = (worker: ServiceWorker) => {
    if (updating || !hasController) {
      return
    }
    updating = true
    // eslint-disable-next-line no-alert
    alert(translate('updateAvailable'))
    worker.postMessage({ type: 'SKIP_WAITING' })
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => {
        if (registration.waiting) {
          promptUpdate(registration.waiting)
          return
        }

        registration.addEventListener('updatefound', () => {
          const worker = registration.installing
          worker?.addEventListener('statechange', () => {
            if (worker.state === 'installed') {
              promptUpdate(worker)
            }
          })
        })
      })
      .catch(() => undefined)
  })
}
