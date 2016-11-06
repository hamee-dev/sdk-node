const Entity = require('./Entity')

class GoodsStatus extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_goodsstatus'
  }
}

module.exports = GoodsStatus
