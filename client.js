export let config = {}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
const camelcase = str => str.split('-').map((e, i) => i === 0 ? e.toLowerCase() : capitalize(e)).join('')

export function initConfig(elementId = 'app', { windowAttr = 'configs' } = {}) {
  const appEl = document.getElementById(elementId)
  try {
    config = JSON.parse(appEl.dataset.config)
    appEl.dataset.config = ''
  } catch (err) {
    console.warn(`icefog: unable to find data-config on #${elementId}`)
  }
  if (config.isDev) {
    window[windowAttr][camelcase(elementId)] = config
    if (elementId === 'app') window.config = config
  }
}

export const setConfig = c => config = c
