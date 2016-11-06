const Entity = require('./Entity')

class Payout extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_payout'
  }
}

module.exports = Payout
