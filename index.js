const qs = require('querystring')
const Connection = require('./lib/Connection')
const Query = require('./lib/Query')

/**
 * Nextengine API for Nodejs
 *
 * 仕様は http://api.next-e.jp を参照
 */
class Nextengine {
  /**
   *
   */
  constructor(opts) {
    this.clientId = opts.clientId
    this.clientSecret = opts.clientSecret
    this.redirectUri = opts.redirectUri
    this.accessToken = opts.accessToken
    this.refreshToken = opts.refreshToken
  }

  /**
   *
   */
  request(path, params) {
    return this.getConnection().request('POST', path, params)
  }

  /**
   *
   */
  getConnection() {
    return new Connection(this.accessToken, this.refreshToken)
  }

  /**
   *
   */
  query(pathOrEntity) {
    const query = new Query(this.getConnection(), pathOrEntity)

    return query
  }

  /**
   *
   */
  create(pathOrEntity, params) {
    this.query(pathOrEntity).request(params)
  }

  /**
   *
   */
  update(pathOrEntity, params) {
    this.query(pathOrEntity).request(params)
  }

  /**
   *
   */
  upload() {

  }

  /**
   *
   */
  waitFor() {

  }

  /**
   *
   */
  uploadAndWaitFor() {

  }

  /**
   *
   */
  authorize(uid, state) {
    return this.request('/api_neauth', { uid: uid, state: state })
  }

  /**
   * http://api.next-e.jp/param_uid_state.php
   *
   */
  getAuthorizeURL() {
    const params = {
      client_id: this.clientId,
      client_secret: this.clientSecret
    }
    if (this.redirectUri) {
      params.redirect_uri = this.redirectUri
    }

    return `${Connection.HOST_PF}/users/sign_in/?${qs.stringify(params)}`
  }
}

module.exports = Nextengine
