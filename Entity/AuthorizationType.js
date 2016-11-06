const Entity = require('./Entity')

class AuthorizationType extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_authorizationtype'
  }
}

module.exports = AuthorizationType
