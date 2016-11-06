const Entity = require('./Entity')

class GoodsChoice extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_select'
  }
}

module.exports = GoodsChoice
