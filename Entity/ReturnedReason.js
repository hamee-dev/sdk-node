const Entity = require('./Entity')

class ReturnedReason extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_returnedreason'
  }
}

module.exports = ReturnedReason
