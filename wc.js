import { ContextProvider, ContextConsumer, createContext } from '@lit/context'
import { getConfigFromString } from './client.js'

export function createComponentBase({ contextKey, ExtendedClass }) {
  const context = createContext(contextKey ?? Symbol('component-config'))

  class ConfigurableComponentRoot extends ExtendedClass {
    static properties = {
      initConfig: { type: String, attribute: 'init-config' },
      _config: { attribute: false, state: true },
    }

    get config() {
      return this._config
    }

    set config(value) {
      this._config = value
      this._provider.setValue(value)
    }

    connectedCallback() {
      super.connectedCallback()
      this._provider = new ContextProvider(this, { context })
      if (typeof this.initConfig === 'string') {
        this.config = getConfigFromString(this.initConfig)
        this.removeAttribute('init-config')
        window.configs = window.configs || {}
        window.configs[contextKey] = Object.freeze(this.config)
      }
    }
  }

  class ConfigurableComponent extends ExtendedClass {
    _consumer = new ContextConsumer(this, { context })
    get config() {
      return this._consumer.value
    }
  }

  return {
    configContext: context,
    ComponentRoot: ConfigurableComponentRoot,
    Component: ConfigurableComponent,
  }
}
