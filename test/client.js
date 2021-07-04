import 'abdomen/setup'
import { initConfig, getConfig, config } from '../client.js'
import { suite } from 'uvu'
import * as assert from 'uvu/assert'

const Client = suite('Client')
const configString = '{"foo":"a","bar":2,"baz":false}'

Client.before.each((ctx) => {
  const testContainer = document.createElement('div')
  document.body.append(testContainer)
  ctx.el = testContainer
})

Client.after.each((ctx) => {
  ctx.el.remove()
})

Client('getConfig returns immutable config from a selector', (ctx) => {
  ctx.el.innerHTML = `<div id="test-target" data-config='${configString}'></div>`
  const config = getConfig('#test-target')
  assert.is(config.foo, 'a')
  assert.is(config.bar, 2)
  assert.is(config.baz, false)
})

Client('getConfig returns immutable config from an element', (ctx) => {
  ctx.el.innerHTML = `<div id="test-target" data-config='${configString}'></div>`
  const el = document.getElementById('test-target')
  const config = getConfig(el)
  assert.is(config.foo, 'a')
  assert.is(config.bar, 2)
  assert.is(config.baz, false)
})

Client('getConfig clears the target of config', (ctx) => {
  ctx.el.innerHTML = `<div id="test-target" data-config='${configString}'></div>`
  const el = document.getElementById('test-target')
  assert.ok(el.dataset.config)
  getConfig(el)
  assert.not.ok(el.dataset.config)
})

Client.run()
