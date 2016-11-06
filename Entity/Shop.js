const Entity = require('./Entity')

class Shop extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_master_shop'
  }
}

module.exports = Shop
