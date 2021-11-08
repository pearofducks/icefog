import { createConfig } from '../server.js'
import { suite } from 'uvu'
import { decode } from '../base64.js'
import * as assert from 'uvu/assert'

const Server = suite('Server')

Server('createConfig throws if the argument is not an object', () => {
  const makeBadConfig = () => createConfig('lol')
  assert.throws(makeBadConfig)
})

Server('createConfig prepares a DOM-ready string from the object', () => {
  const obj = { foo: 'bar', negative: false, number: 100, stringNumber: '200' }
  const result = createConfig(obj)
  const dataAttr = 'data-config='
  assert.ok(result.includes(dataAttr))
  const configString = result.replace(dataAttr, '').replaceAll(`'`, '')
  const config = JSON.parse(decode(configString))
  assert.is(config.foo, 'bar')
  assert.is(config.negative, false)
  assert.is(config.number, 100)
  assert.is(config.stringNumber, '200')
  assert.is.not(config.stringNumber, 200)
})

Server.run()
