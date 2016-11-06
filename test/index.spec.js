/* eslint-env mocha */

const assert = require('assert')
const qs = require('querystring')
const Nextengine = require('../')
const Connection = require('../lib/Connection')
const Query = require('../lib/Query')
const { Goods } = require('../Entity')

describe('Nextengine', () => {
  describe('request', () => {
    it('must return Promise', () => {
      const ne = new Nextengine({})
      assert.ok(ne.request() instanceof Promise)
    })
  })

  describe('getConnection', () => {
    it('must return instance of Connection', () => {
      const ne = new Nextengine({})
      assert.ok(ne.getConnection() instanceof Connection)
    })
  })

  describe('query', () => {
    it('must return instance of Query', () => {
      const ne = new Nextengine({})
      assert.ok(ne.query() instanceof Query)
    })
  })

  describe('create', () => {
    it('must return Promise', () => {
      const ne = new Nextengine({})
      assert.ok(ne.create(Goods, {}) instanceof Promise)
    })
  })

  describe('update', () => {
    it('must return Promise', () => {
      const ne = new Nextengine({})
      assert.ok(ne.update(Goods, {}) instanceof Promise)
    })
  })

  describe('upload', () => {
    it('must return Promise', () => {
      const ne = new Nextengine({})
      assert.ok(ne.upload(Goods, {}) instanceof Promise)
    })
  })

  describe('waitFor', () => {
    it('must return Promise', () => {
      const ne = new Nextengine({})
      assert.ok(ne.waitFor() instanceof Promise)
    })
  })

  describe('uploadAndWaitFor', () => {
    it('must return Promise', () => {
      const ne = new Nextengine({})
      assert.ok(ne.uploadAndWaitFor(Goods) instanceof Promise)
    })
  })

  describe('authorize', () => {
    it('must return Promise', () => {
      const ne = new Nextengine({})
      assert.ok(ne.authorize() instanceof Promise)
    })
  })

  describe('getAuthorizeURL', () => {
    const env = process.env

    it('must return url with query string client_id', () => {
      const ne = new Nextengine({ clientId: env.CLIENT_ID })
      const url = ne.getAuthorizeURL()
      const query = qs.parse(url.substr(url.indexOf('?') + 1))

      assert.ok(!!query.client_id)
      assert.ok(!query.redirect_uri)
    })

    it('must return url with query string client_secret', () => {
      const ne = new Nextengine({ clientSecret: env.CLIENT_SECRET })
      const url = ne.getAuthorizeURL()
      const query = qs.parse(url.substr(url.indexOf('?') + 1))

      assert.ok(!!query.client_secret)
      assert.ok(!query.redirect_uri)
    })

    it('must return url with query string redirect_uri if redirectUri present', () => {
      const ne = new Nextengine({ redirectUri: 'hoge' })
      const url = ne.getAuthorizeURL()
      const query = qs.parse(url.substr(url.indexOf('?') + 1))

      assert.ok(!!query.redirect_uri)
    })
  })
})
