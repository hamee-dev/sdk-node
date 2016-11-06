const Entity = require('./Entity')

class GoodsType extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_goodstype'
  }
}

module.exports = GoodsType
