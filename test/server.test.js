import { createConfig } from '../server.js'
import { suite } from 'uvu'
import { decode } from '../base64.js'
import { describe, it } from 'node:test'
import * as assert from 'node:assert/strict'
// import * as assert from 'uvu/assert'

// const Server = suite('Server')

describe('createConfig', () => {
  it('throws if the argument is not an object', () => {
    const makeBadConfig = () => createConfig('lol')
    assert.throws(makeBadConfig)
  })

  it('prepares a DOM-ready string from the object', () => {
    const obj = { foo: 'bar', negative: false, number: 100, stringNumber: '200' }
    const result = createConfig(obj)
    const dataAttr = 'data-config='
    assert.ok(result.includes(dataAttr))
    const configString = result.replace(dataAttr, '').replaceAll(`'`, '')
    const config = JSON.parse(decode(configString))
    assert.equal(config.foo, 'bar')
    assert.equal(config.negative, false)
    assert.equal(config.number, 100)
    assert.equal(config.stringNumber, '200')
    assert.notEqual(config.stringNumber, 200)
  })
})
