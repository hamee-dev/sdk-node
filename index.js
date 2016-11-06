const qs = require('querystring')
const Connection = require('./lib/Connection')
const Query = require('./lib/Query')

/**
 * Nextengine API for Nodejs
 *
 * @see http://api.next-e.jp
 */
class Nextengine {
  /**
   * Constructor
   *
   * @param object opts
   *   @param string opts.clientId       client id
   *   @param string opts.clientSecret   client secret
   *   @param string [opts.redirectUri]  (optional)redirect uri
   *   @param string [opts.accessToken]  (optional)access token
   *   @param string [opts.refreshToken] (optional)refresh token
   */
  constructor (opts) {
    this.clientId = opts.clientId
    this.clientSecret = opts.clientSecret
    this.redirectUri = opts.redirectUri
    this.accessToken = opts.accessToken
    this.refreshToken = opts.refreshToken
  }

  /**
   * Send request to Nextengine API
   *
   * @see http://api.next-e.jp/request_url.php
   * @param string path   path of api
   * @param object params request body
   * @return Promise
   */
  request (path, params) {
    return this.getConnection().request('POST', path, params)
  }

  /**
   * Return Connection instance
   * 
   * You can override this method to use custom connection
   * 
   * @return Connection
   */
  getConnection () {
    return new Connection(this.accessToken, this.refreshToken)
  }

  /**
   * Start query building
   *
   * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
   * @return Query
   */
  query (pathOrEntity) {
    const query = new Query(this.getConnection(), pathOrEntity)

    return query
  }

  /**
   * Send {xxx}/create request
   *
   * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
   * @param object params request body
   * @return Promise
   */
  create (pathOrEntity, params) {
    this.query(pathOrEntity).request(params)
  }

  /**
   * Send {xxx}/update request
   *
   * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
   * @param object params request body
   * @return Promise
   */
  update (pathOrEntity, params) {
    this.query(pathOrEntity).request(params)
  }

  /**
   * Send {xxx}/update request
   *
   * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
   * @param object params              request body
   * @return Promise
   */
  upload (pathOrEntity, params) {

  }

  /**
   * Poll upload queue until specified status
   *
   * @param int queueId                       ID of upload queue
   * @param int [state=UploadQueue.COMPLETED] ID of upload status
   * @return Promise
   */
  waitFor (queueId, state) {
    state = state || UploadQueue.COMPLETED
  }

  /**
   * utility of upload + waitFor
   *
   * @param string|Entity pathOrEntity        ex. 'receiveorder_base' or ReceiveOrder
   * @param int [state=UploadQueue.COMPLETED] ID of upload status
   * @return Promise
   */
  uploadAndWaitFor (pathOrEntity, params, state) {
    state = state || UploadQueue.COMPLETED
  }

  /**
   * Fetch access token and refresh token
   *
   * @param string uid
   * @param string state
   * @return Promise
   */
  authorize (uid, state) {
    return this.request('/api_neauth', { uid: uid, state: state })
  }

  /**
   * Get authorize screen url
   *
   * @see http://api.next-e.jp/param_uid_state.php
   * @return string url for authorize
   */
  getAuthorizeURL () {
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
