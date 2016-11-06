const Entity = require('./Entity')

class Supplier extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_master_supplier'
  }
}

module.exports = Supplier
