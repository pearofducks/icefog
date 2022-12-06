import { decode } from './base64.js'

/** @type {object} */
export let config = {}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
const camelcase = str => str.split('-').map((e, i) => i === 0 ? e.toLowerCase() : capitalize(e)).join('')
const queryForElement = (elementQuery) => document.querySelector(elementQuery)
const getConfigEl = (element) => element instanceof HTMLElement ? element : queryForElement(element)
const getId = (element) => {
  try {
    return getConfigEl(element).getAttribute('id')
  } catch (err) {}
}

/**
 * getConfig parses a data-config attribute on an html element
 * @arg {string|HTMLElement} element
 * @returns {object}
 */
export function getConfig(element) {
  const configEl = getConfigEl(element)
  const _config = Object.freeze(JSON.parse(decode(configEl.dataset.config)))
  configEl.removeAttribute('data-config')
  return _config
}

/**
 * initConfig assigns the data found on the element to the config export
 * @arg {string|HTMLElement} element
 * @arg {object} options
 * @arg {string} options.windowAttr
 */
export function initConfig(element = '#app', { windowAttr = 'configs', configId = '_configId' } = {}) {
  try {
    config = getConfig(element)
    const id = getId(element) || config[configId]
    if (id) {
      if (!window[windowAttr]) window[windowAttr] = {}
      window[windowAttr][camelcase(id)] = config
    }
  } catch (err) {
    console.warn(`Error initializing config: ${err}`)
  }
}

/** @type {(config: object) => void} */
export const setConfig = c => config = c
