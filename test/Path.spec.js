/* eslint-env mocha */

const assert = require('assert')
const Path = require('../lib/Path')
const { ReceiveOrder } = require('../Entity')

describe('Path', () => {
  describe('resolve', () => {
    it('must return path string if string passed', () => {
      assert.equal(Path.resolve('hoge', 'search'), '/api_v1_hoge/search')
    })
    it('must return path string if Entity passed', () => {
      assert.equal(Path.resolve(ReceiveOrder, 'search'), '/api_v1_receiveorder_base/search')
    })
  })

  describe('findPath', () => {
    it('must return string', () => {
      assert.equal(typeof Path.findPath(), 'string')
    })
  })
})
