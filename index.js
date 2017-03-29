const qs = require('querystring')
const Connection = require('./lib/Connection')
const Query = require('./lib/Query')
const { UploadQueue } = require('./Entity')

/**
 * Nextengine API for Nodejs
 *
 * @see http://api.next-e.jp
 */
class Nextengine {
  get accessToken () {
    return this.connection.accessToken
  }

  get refreshToken () {
    return this.connection.refreshToken
  }

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
    this.connection = this.getConnection(opts.accessToken, opts.refreshToken)
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
    return this.connection.request('POST', path, params)
  }

  /**
   * Return Connection instance
   *
   * You can override this method to use custom connection
   *
   * @return Connection
   */
  getConnection (accessToken, refreshToken) {
    return new Connection(accessToken, refreshToken)
  }

  /**
   * Start query building
   *
   * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
   * @return Query
   */
  query (pathOrEntity) {
    const query = new Query(this.connection, pathOrEntity)

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
    return this.query(pathOrEntity).request(params, 'create')
  }

  /**
   * Send {xxx}/update request
   *
   * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
   * @param object params request body
   * @return Promise
   */
  update (pathOrEntity, params) {
    return this.query(pathOrEntity).request(params, 'update')
  }

  /**
   * Send {xxx}/update request
   *
   * @param string|Entity pathOrEntity ex. 'receiveorder_base' or ReceiveOrder
   * @param object params              request body
   * @return Promise
   */
  upload (pathOrEntity, params) {
    return this.query(pathOrEntity).request(params, 'upload')
  }

  /**
   * Poll upload queue until specified status
   *
   * @param int   queueId                                                ID of upload queue
   * @param int[] [statuses=[UploadQueue.COMPLETED, UploadQueue.FAILED]] ID of upload status
   * @param int   [interval=5000]                                        Interval of polling
   * @return Promise
   */
  waitFor (queueId, statuses, interval) {
    statuses = statuses || [UploadQueue.COMPLETED, UploadQueue]
    interval = interval || 5000

    return this.query(UploadQueue)
      .where('que_id', '=', queueId)
      .get(['que_status_id'])
      .then(res => {
        if (statuses.indexOf(res.que_status_id) >= 0) {
          return Promise.resolve()
        } else {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this.waitFor(queueId, statuses, interval)
                .then(resolve)
                .catch(reject)
            }, interval)
          })
        }
      })
  }

  /**
   * utility of upload + waitFor
   *
   * @see upload
   * @see waitFor
   * @param string|Entity pathOrEntity
   * @param int[] [statuses] ID of upload status
   * @return Promise
   */
  uploadAndWaitFor (pathOrEntity, params, statuses) {
    return this.upload(pathOrEntity, params)
      .then(res => this.waitFor(res.que_id, statuses))
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

    return `${this.connection.constructor.HOST_PF}/users/sign_in/?${qs.stringify(params)}`
  }
}

module.exports = Nextengine
