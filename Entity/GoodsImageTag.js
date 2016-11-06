const Entity = require('./Entity')

class GoodsImageTag extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_master_goodsimagetag'
  }
}

module.exports = GoodsImageTag
