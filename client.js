export let config = {}

export function initConfig(elementId = 'app', { windowAttr = 'config' } = {}) {
  const appEl = document.getElementById(elementId)
  if (appEl?.dataset?.config) config = JSON.parse(appEl.dataset.config)
  else console.warn(`env-config: unable to find data-config on #${elementId}`)
  if (config.isDev) window[windowAttr] = config
}

export const setConfig = c => config = c
