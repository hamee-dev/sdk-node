const Entity = require('./Entity')

class CreditType extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_credittype'
  }
}

module.exports = CreditType
