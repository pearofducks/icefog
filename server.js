import serialize from 'serialize-javascript'

export function createConfig(config = {}) {
  const json = serialize(config, { isJSON: true, ignoreFunction: true })
  return `data-config='${json}'`
}
