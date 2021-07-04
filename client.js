export let config = {}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
const camelcase = str => str.split('-').map((e, i) => i === 0 ? e.toLowerCase() : capitalize(e)).join('')
const getConfigEl = (element) => element instanceof HTMLElement ? element : document.querySelector(element)

export function getConfig(element) {
  const configEl = getConfigEl(element)
  const _config = Object.freeze(JSON.parse(configEl.dataset.config))
  configEl.removeAttribute('data-config')
  return _config
}

export function initConfig(element = '#app', { windowAttr = 'configs' } = {}) {
  try {
    config = getConfig(element)
    if (config.isDev) {
      if (!window[windowAttr]) window[windowAttr] = {}
      window[windowAttr][camelcase(elementId)] = config
    }
  } catch (err) {
    console.warn(`icefog: unable to find data-config on ${element}`)
  }
}

export const setConfig = c => config = c
