const Entity = require('./Entity')

class Goods extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_master_goods'
  }
}

module.exports = Goods
