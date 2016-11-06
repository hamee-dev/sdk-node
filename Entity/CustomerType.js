const Entity = require('./Entity')

class CustomerType extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_customertype'
  }
}

module.exports = CustomerType
