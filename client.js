/** @type {object} */
export let config = {}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
const camelcase = str => str.split('-').map((e, i) => i === 0 ? e.toLowerCase() : capitalize(e)).join('')
const getConfigEl = (element) => element instanceof HTMLElement ? element : document.querySelector(element)
const getId = (element) => (element instanceof HTMLElement ? element : document.querySelector(element)).getAttribute('id')

/**
 * getConfig parses a data-config attribute on an html element
 * @arg {string|HTMLElement} element
 * @returns {object}
 */
export function getConfig(element) {
  const configEl = getConfigEl(element)
  const _config = Object.freeze(JSON.parse(configEl.dataset.config))
  configEl.removeAttribute('data-config')
  return _config
}

/**
 * initConfig assigns the data found on the element to the config export
 * @arg {string|HTMLElement} element
 * @arg {object} options
 * @arg {string} options.windowAttr
 */
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

/** @type {(config: object) => void} */
export const setConfig = c => config = c
