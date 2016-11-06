const Entity = require('./Entity')

class OrderCondition extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_ordercondition'
  }
}

module.exports = OrderCondition
