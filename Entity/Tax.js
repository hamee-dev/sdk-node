const Entity = require('./Entity')

class Tax extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_tax'
  }
}

module.exports = Tax
