type _Config = Record<string, unknown>

interface Options {
  /** Will return the raw config-string when true */
  raw?: boolean;
}

/**
 * createConfig makes a DOM-ready string from an object
 * @arg {object} config - the object to stringify
 * @returns {string}
 * @example
 * ```
 * const cfg = { isDev: true, appName: 'foo' }
 * const html = `<div id="app" ${createConfig(cfg)}></div>`
 * ```
 */
export function createConfig(config: _Config, options: Options): string
