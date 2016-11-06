const Entity = require('./Entity')

class Fraction extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_fraction'
  }
}

module.exports = Fraction
