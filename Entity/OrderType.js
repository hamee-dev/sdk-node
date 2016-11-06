const Entity = require('./Entity')

class OrderType extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_order'
  }
}

module.exports = OrderType
