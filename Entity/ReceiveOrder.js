const Entity = require('./Entity')

class ReceiveOrder extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_receiveorder_base'
  }
}

module.exports = ReceiveOrder
