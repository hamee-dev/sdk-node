
const qs = require('querystring')
const fetch = require('node-fetch')

class Connection {
  static get HOST () {
    return 'https://api.next-engine.org'
  }

  static get HOST_PF () {
    return 'https://base.next-engine.org'
  }

  static get DEFAULT_OPTIONS () {
    return {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'gzip,deflate'
      }
    }
  }

  /**
   *
   */
  constructor (accessToken, refreshToken) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }

  request (method, path, params) {
    params = params || {}

    if (this.accessToken) {
      params.access_token = this.accessToken
      params.refresh_token = this.refreshToken
    }

    const url = Connection.HOST + path
    const opts = Object.assign(Connection.DEFAULT_OPTIONS, {
      method: method,
      body: qs.stringify(params)
    })

    return fetch(url, opts).then(this.handleResponse)
  }

  handleResponse (res) {
    return res.json()
  }
}

module.exports = Connection
