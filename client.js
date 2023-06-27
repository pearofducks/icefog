import { decode } from './base64.js'

/** @type {import('./client.d.ts').Config} */
export let config = {}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
const camelcase = str => str.split('-').map((e, i) => i === 0 ? e.toLowerCase() : capitalize(e)).join('')
const getConfigEl = (element) => element instanceof HTMLElement ? element : document.querySelector(element)

/** @type {import('./client.d.ts').getConfig} */
export function getConfig(element, { removeAttr = true } = {}) {
  const configEl = getConfigEl(element)
  const _config = Object.freeze(JSON.parse(decode(configEl.dataset.config)))
  if (removeAttr) configEl.removeAttribute('data-config')
  return _config
}

/** @type {import('./client.d.ts').initConfig} */
export function initConfig(element = '#app', { windowAttr = 'configs', configId = '_id' } = {}) {
  try {
    const el = getConfigEl(element)
    config = getConfig(el)
    const id = el.getAttribute('id') || config[configId]
    if (id) {
      if (!window[windowAttr]) window[windowAttr] = {}
      window[windowAttr][camelcase(id)] = config
    }
  } catch (err) {
    console.warn(`Error initializing config: ${err}`)
  }
}

/** @type {import('./client.d.ts').setConfig} */
export const setConfig = c => config = Object.freeze(c)
