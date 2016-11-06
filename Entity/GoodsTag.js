const Entity = require('./Entity')

class GoodsTag extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_master_goodstag'
  }
}

module.exports = GoodsTag
