type _Config = Record<string, unknown>
export type Config = Readonly<_Config>

interface GetConfigOptions {
  removeAttr: boolean;
}
interface InitConfigOptions {
  windowAttr: string;
  configId: string;
}

/**
 * getConfig parses a data-config attribute on an html element
 * @arg {HTMLElement} element - the query-string or element to parse config from
 * @arg {object} options
 * @arg {boolean} options.removeAttr
 * @returns {object} - the config
 */
export function getConfig(element: HTMLElement, options?: GetConfigOptions): Config;

/**
 * initConfig assigns the data found on the element to the config export
 * @arg {string|HTMLElement} element
 * @arg {object} options
 * @arg {string} options.windowAttr
 * @arg {string} options.configId
 */
export function initConfig(element?: string | HTMLElement, options?: InitConfigOptions): void;

/** @type {object} */
export let config: Config;

/**
 * @function
 * @template T
 * @returns {T}
 */
export function useConfig<T>(): T

/** @type {(config: object) => void} */
export const setConfig: (config: _Config) => void;
