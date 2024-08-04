import serialize from 'serialize-javascript'
import { encode } from './base64.js'

/** @type {import('./server.d.ts').createConfig} */
export function createConfig(config) {
  if (typeof config !== 'object') throw new TypeError('config must be an object')
  const json = serialize(config, { isJSON: true, ignoreFunction: true })
  const configString = encode(json)
  return `data-config='${configString}'`
}
