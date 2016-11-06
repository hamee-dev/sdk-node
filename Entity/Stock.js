const Entity = require('./Entity')

class Stock extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_master_stock'
  }
}

module.exports = Stock
