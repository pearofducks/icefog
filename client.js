export let config = {}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
const camelcase = str => str.split('-').map((e, i) => i === 0 ? e.toLowerCase() : capitalize(e)).join('')
const getConfigEl = (element) => element instanceof HTMLElement ? element : document.querySelector(element)
const getId = (element) => (element instanceof HTMLElement ? element : document.querySelector(element)).getAttribute('id')

export function getConfig(element) {
  const configEl = getConfigEl(element)
  const _config = Object.freeze(JSON.parse(configEl.dataset.config))
  configEl.removeAttribute('data-config')
  return _config
}

export function initConfig(element = '#app', { windowAttr = 'configs' } = {}) {
  try {
    const id = getId(element)
    config = getConfig(element)
    if (config.isDev && id) {
      if (!window[windowAttr]) window[windowAttr] = {}
      window[windowAttr][camelcase(id)] = config
    }
  } catch (err) {
    console.warn(`Error initializing config: ${err}`)
  }
}

export const setConfig = c => config = c
