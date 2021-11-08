import serialize from 'serialize-javascript'
import { encode } from './base64.js'

/**
 * createConfig makes a DOM-ready string from an object
 * @arg {object} config - the object to stringify
 * @returns {string}
 */
export function createConfig(config) {
  if (typeof config !== 'object') throw new TypeError('config must be an object')
  const json = serialize(config, { isJSON: true, ignoreFunction: true })
  const configString = encode(json)
  return `data-config='${configString}'`
}
