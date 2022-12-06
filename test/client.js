import 'abdomen/setup'
import { initConfig, getConfig, config, setConfig } from '../client.js'
import { encode } from '../base64.js'
import { suite } from 'uvu'
import * as assert from 'uvu/assert'

const Client = suite('Client')
const configString = encode('{"foo":"a","bar":2,"baz":false,"isDev":true,"_configId":"icefog-id"}')

Client.before.each((ctx) => {
  const testContainer = document.createElement('div')
  document.body.append(testContainer)
  testContainer.innerHTML = `<div id="test-target" data-config='${configString}'></div>`
  ctx.el = testContainer
})

Client.after.each((ctx) => {
  ctx.el.remove()
  delete window.configs
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

Client('initConfig assigns getConfig to the config export', () => {
  assert.is.not(config.foo, 'a')
  initConfig('#test-target')
  assert.is(config.foo, 'a')
})

Client('setConfig assigns its argument to the config export', () => {
  initConfig('#test-target')
  assert.is(config.foo, 'a')
  setConfig({ llama: 'wombat' })
  assert.is.not(config.foo, 'a')
  assert.is(config.llama, 'wombat')
})

Client('window.configs will be set when an id is present', () => {
  assert.not.ok(window.configs)
  initConfig('#test-target')
  assert.ok(window.configs)
  assert.ok(window.configs.testTarget)
  assert.is(window.configs.testTarget.foo, 'a')
})

Client('window.configs will be set when a specific attribute is present on config', (ctx) => {
  ctx.el.querySelector('[data-config]').removeAttribute('id')
  assert.not.ok(window.configs)
  initConfig('[data-config]')
  assert.ok(window.configs)
  assert.ok(window.configs.icefogId)
  assert.is(window.configs.icefogId.foo, 'a')
})

Client.run()
