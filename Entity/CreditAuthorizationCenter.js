const Entity = require('./Entity')

class CreditAuthorizationCenter extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_creditauthorizationcenter'
  }
}

module.exports = CreditAuthorizationCenter
