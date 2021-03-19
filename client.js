export let config = {}

export function initConfig(elementId = 'app', { windowAttr = 'config' } = {}) {
  const appEl = document.getElementById(elementId)
  try {
    config = JSON.parse(appEl.dataset.config)
    appEl.dataset.config = ''
  } catch (err) {
    console.warn(`icefog: unable to find data-config on #${elementId}`)
  }
  if (config.isDev) window[elementId === 'app' ? '' : `${elementId}-` + windowAttr] = config
}

export const setConfig = c => config = c
