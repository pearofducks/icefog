type _Config = Record<string, unknown>
export type Config = Readonly<_Config>

interface InitConfigOptions {
  windowAttr?: string;
  configId?: string;
}

/**
 * getConfig parses a data-config attribute on an html element
 * @arg {string} str - the stringt to parse into config
 * @returns {object} - the config
 */
export function getConfigFromString<T>(str: string): T

/**
 * getConfig parses a data-config attribute on an html element
 * @arg {Element} element - the element to parse config from
 * @returns {object} - the config
 */
export function getConfig<T>(element: Element): T

/**
 * initConfig assigns the data found on the element to the config export
 * @arg {string | Element} element
 * @arg {InitConfigOptions} options
 */
export function initConfig(element?: string | Element, options?: InitConfigOptions): void

/** @type {object} */
export let config: Config

/**
 * @function
 * @template T
 * @returns {T}
 */
export function useConfig<T>(): T

/** @type {(config: object) => void} */
export const setConfig: (config: _Config) => void
