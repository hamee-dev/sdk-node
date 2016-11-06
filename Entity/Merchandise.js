const Entity = require('./Entity')

class Merchandise extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_merchandise'
  }
}

module.exports = Merchandise
