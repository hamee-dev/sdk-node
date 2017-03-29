
const qs = require('querystring')
const fetch = require('node-fetch')
const ConnectionError = require('./ConnectionError')

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

  /**
   * @param string        method XXX
   * @param string|Entity path   XXX
   * @param object        params XXX
   * @return Promise
   */
  request (method, path, params) {
    params = params || {}

    if (this.accessToken) {
      params.access_token = this.accessToken
      params.refresh_token = this.refreshToken
    }

    const url = this.constructor.HOST + path
    const opts = Object.assign(this.constructor.DEFAULT_OPTIONS, {
      method: method,
      body: qs.stringify(params)
    })

    return fetch(url, opts).then(this.handleResponse.bind(this))
  }

  handleResponse (res) {
    return res.json()
      .then(json => {
        this.accessToken = json.access_token
        this.refreshToken = json.refresh_token

        return json
      })
      .then(json => {
        if (json.result === 'success') {
          return Promise.resolve(json)
        } else {
          return Promise.reject(new ConnectionError(json.message, json.code, json))
        }
      })
  }
}

module.exports = Connection
