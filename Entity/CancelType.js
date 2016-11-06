const Entity = require('./Entity')

class CancelType extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_canceltype'
  }
}

module.exports = CancelType
