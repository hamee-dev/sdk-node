const Entity = require('./Entity')

class ImportantCheck extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_importantcheck'
  }
}

module.exports = ImportantCheck
