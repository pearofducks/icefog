import 'abdomen/setup'
import { initConfig, getConfig, config as configExport, setConfig, useConfig } from '../client.js'
import { encode } from '../base64.js'
import { suite } from 'uvu'
import * as assert from 'uvu/assert'

const Client = suite('Client')
const _cfg = { foo: 'a', bar: 2, baz: false }
const configString = encode(JSON.stringify(_cfg))
const otherConfigString = encode(JSON.stringify({ ..._cfg, _id: 'my-config', foo: 'b' }))

Client.before.each((ctx) => {
  const testContainer = document.createElement('div')
  document.body.append(testContainer)
  testContainer.innerHTML = `<div id="test-target" data-config='${configString}'></div><article data-config='${otherConfigString}'></article>`
  ctx.el = testContainer
})

Client.after.each((ctx) => {
  ctx.el.remove()
  delete window.configs
  setConfig({})
})

Client('getConfig gets config from a selector', () => {
  const config = getConfig('#test-target')
  assert.is(config.foo, 'a')
  assert.is(config.bar, 2)
  assert.is(config.baz, false)
})

Client('getConfig gets config from an element', () => {
  const el = document.getElementById('test-target')
  const config = getConfig(el)
  assert.is(config.foo, 'a')
  assert.is(config.bar, 2)
  assert.is(config.baz, false)
})

Client('getConfig clears the target of config', () => {
  const el = document.getElementById('test-target')
  assert.ok(el.dataset.config)
  getConfig(el)
  assert.not.ok(el.dataset.config)
})

Client('getConfig returns an immutable object', () => {
  const config = getConfig('#test-target')
  const tryToSetValue = () => { config.foo = 'bar' }
  assert.throws(tryToSetValue)
})

Client('useConfig returns the config object', () => {
  initConfig('#test-target')
  /** @type {{ foo: 'a', bar: 2, baz: false }} */
  const config = useConfig()
  const tryToSetValue = () => { config.foo = 'bar' }
  assert.throws(tryToSetValue)
  assert.is(config.foo, 'a')
  assert.is(config.bar, 2)
  assert.is(config.baz, false)
})

Client('initConfig assigns getConfig to the config export', () => {
  assert.is.not(configExport.foo, 'a')
  initConfig('#test-target')
  assert.is(configExport.foo, 'a')
})

Client('setConfig assigns its argument to the config export', () => {
  initConfig('#test-target')
  assert.is(configExport.foo, 'a')
  setConfig({ llama: 'wombat' })
  assert.is.not(configExport.foo, 'a')
  assert.is(configExport.llama, 'wombat')
})

Client('window.configs will be set when an id is available', () => {
  assert.not.ok(window.configs)
  initConfig('#test-target')
  assert.ok(window.configs)
  assert.not.ok(window.configs.myConfig)
  assert.ok(window.configs.testTarget)
  assert.is(window.configs.testTarget.foo, 'a')

  const otherElement = document.querySelector('article')
  initConfig(otherElement)
  assert.ok(window.configs.myConfig)
  assert.is(window.configs.myConfig.foo, 'b')
})

Client.run()
