const Entity = require('./Entity')

class ReceiveOrderOption extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_receiveorder_option'
  }
}

module.exports = ReceiveOrderOption
