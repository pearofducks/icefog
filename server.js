import serialize from 'serialize-javascript'
import { encode } from './base64.js'

/** @type {import('./server.d.ts').createConfig} */
export function createConfig(config, { raw = false } = {}) {
  if (typeof config !== 'object') throw new TypeError('config must be an object')
  const json = serialize(config, { isJSON: true, ignoreFunction: true })
  const configString = encode(json)
  if (raw) return configString
  return `data-config='${configString}'`
}
