/* eslint-env mocha */

describe('Connection', () => {
  describe('get HOST', () => {
    it('must return url formatted string')
  })

  describe('get HOST_PF', () => {
    it('must return url formatted string')
  })

  describe('get DEFAULT_OPTIONS', () => {
    it('must return object')
  })

  describe('request', () => {
    it('must return Promise')
    it('must pass URL to fetch')
    it('must pass HTTP method to fetch')
    it('must call node-fetch.fetch')
    it('must call handleResponse if Promise fulfilled')
  })

  describe('handleResponse', () => {
    it('must return Promise')
    it('must pass response object if Promise fulfilled')
  })
})
