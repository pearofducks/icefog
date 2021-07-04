import serialize from 'serialize-javascript'

export function createConfig(config) {
  if (typeof config !== 'object') throw new TypeError('config must be an object')
  const json = serialize(config, { isJSON: true, ignoreFunction: true })
  return `data-config='${json}'`
}
