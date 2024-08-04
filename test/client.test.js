import { GlobalRegistrator } from '@happy-dom/global-registrator'
import { initConfig, getConfig, config as configExport, setConfig, useConfig } from '../client.js'
import { encode } from '../base64.js'
import { describe, it, before, after, beforeEach, afterEach } from 'node:test'
import * as assert from 'node:assert/strict'

const _cfg = { foo: 'a', bar: 2, baz: false }
const configString = encode(JSON.stringify(_cfg))
const otherConfigString = encode(JSON.stringify({ ..._cfg, _id: 'my-config', foo: 'b' }))

const beforeHook = (ctx) => {
  const testContainer = document.createElement('div')
  document.body.append(testContainer)
  testContainer.innerHTML = `<div id="test-target" data-config='${configString}'></div><article data-config='${otherConfigString}'></article>`
  ctx.el = testContainer
}

const afterHook = (ctx) => {
  ctx.el.remove()
  delete window.configs
  setConfig({})
}

describe('getClient', () => {
  before(() => GlobalRegistrator.register())
  beforeEach(beforeHook)
  afterEach(afterHook)
  after(async () => await GlobalRegistrator.unregister())

  it('gets config from an element', () => {
    const el = document.getElementById('test-target')
    const config = getConfig(el)
    assert.equal(config.foo, 'a')
    assert.equal(config.bar, 2)
    assert.equal(config.baz, false)
  })

  it('clears the target of config', () => {
    const el = document.getElementById('test-target')
    assert.ok(el.dataset.config)
    getConfig(el)
    assert.ok(!el.dataset.config)
  })

  it('returns an immutable object', () => {
    const el = document.getElementById('test-target')
    const config = getConfig(el)
    const tryToSetValue = () => { config.foo = 'bar' }
    assert.throws(tryToSetValue)
  })
})

describe('other methods', () => {
  before(() => GlobalRegistrator.register())
  beforeEach(beforeHook)
  afterEach(afterHook)
  after(async () => await GlobalRegistrator.unregister())

  it('useConfig returns the config object', () => {
    initConfig('#test-target')
    /** @type {{ foo: 'a', bar: 2, baz: false }} */
    const config = useConfig()
    const tryToSetValue = () => { config.foo = 'bar' }
    assert.throws(tryToSetValue)
    assert.equal(config.foo, 'a')
    assert.equal(config.bar, 2)
    assert.equal(config.baz, false)
  })

  it('initConfig assigns getConfig to the config export', () => {
    assert.notEqual(configExport.foo, 'a')
    initConfig('#test-target')
    assert.equal(configExport.foo, 'a')
  })

  it('setConfig assigns its argument to the config export', () => {
    initConfig('#test-target')
    assert.equal(configExport.foo, 'a')
    setConfig({ llama: 'wombat' })
    assert.notEqual(configExport.foo, 'a')
    assert.equal(configExport.llama, 'wombat')
  })

  it('window.configs will be set when an id is available', () => {
    assert.ok(!window.configs)
    initConfig('#test-target')
    assert.ok(window.configs)
    assert.ok(!window.configs.myConfig)
    assert.ok(window.configs.testTarget)
    assert.equal(window.configs.testTarget.foo, 'a')

    const otherElement = document.querySelector('article')
    initConfig(otherElement)
    assert.ok(window.configs.myConfig)
    assert.equal(window.configs.myConfig.foo, 'b')
  })
})
