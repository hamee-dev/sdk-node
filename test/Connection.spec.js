/* eslint-env mocha */

const assert = require('assert')
const sinon = require('sinon')
const fetch = require('node-fetch')
const Connection = require('../lib/Connection')

describe('Connection', () => {
  describe('get HOST', () => {
    it('must return url formatted string', () => {
      assert.ok(typeof Connection.HOST === 'string')
    })
  })

  describe('get HOST_PF', () => {
    it('must return url formatted string', () => {
      assert.ok(typeof Connection.HOST_PF === 'string')
    })
  })

  describe('get DEFAULT_OPTIONS', () => {
    it('must return object', () => {
      assert.ok(typeof Connection.DEFAULT_OPTIONS === 'object')
    })
  })

  describe('request', () => {
    it('must return Promise', () => {
      const conn = new Connection()
      assert.ok(conn.request('POST', '/') instanceof Promise)
    })
    it('must call handleResponse if Promise fulfilled', () => {
      const conn = new Connection()
      sinon.stub(conn, 'handleResponse')

      return conn.request('POST', '/')
        .then(() => assert.ok(conn.handleResponse.called))
    })
  })

  describe('handleResponse', () => {
    it('must return Promise', () => {
      const conn = new Connection()
      const res = new fetch.Response()
      assert.ok(conn.handleResponse(res) instanceof Promise)
    })
  })
})
