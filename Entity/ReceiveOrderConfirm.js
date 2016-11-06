const Entity = require('./Entity')

class ReceiveOrderConfirm extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_receiveorder_confirm'
  }
}

module.exports = ReceiveOrderConfirm
