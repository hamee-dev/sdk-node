const Entity = require('./Entity')

class Mall extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_system_mall'
  }
}

module.exports = Mall
