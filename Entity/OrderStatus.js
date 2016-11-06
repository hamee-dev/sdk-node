const Entity = require('./Entity')

class OrderStatus extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_orderstatus'
  }
}

module.exports = OrderStatus
