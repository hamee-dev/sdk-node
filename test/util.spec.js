/* eslint-env mocha */

const assert = require('assert')
const { digg } = require('../lib/util')

describe('util', () => {
  describe('digg', () => {
    it('must call object-path.get', () => {
      const expected = 100
      const fn = digg('a.b.c')

      assert.equal(fn({ a: { b: { c: expected } } }), expected)
    })
  })
})
