export let config = {}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
const camelcase = str => str.split('-').map((e, i) => i === 0 ? e.toLowerCase() : capitalize(e)).join('')

export function initConfig(elementId = 'app', { windowAttr = 'configs' } = {}) {
  try {
    const appEl = document.getElementById(elementId)
    config = JSON.parse(appEl.dataset.config)
    appEl.dataset.config = ''
    if (config.isDev) {
      if (!window[windowAttr]) window[windowAttr] = {}
      window[windowAttr][camelcase(elementId)] = config
      if (elementId === 'app') window.config = config
    }
  } catch (err) {
    console.warn(`icefog: unable to find data-config on #${elementId}`)
  }
}

export const setConfig = c => config = c
