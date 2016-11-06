const Entity = require('./Entity')

class ImportType extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_importtype'
  }
}

module.exports = ImportType
