const Entity = require('./Entity')

class Delivery extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_delivery'
  }
}

module.exports = Delivery
