const Entity = require('./Entity')

class ItemName extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_itemname'
  }
}

module.exports = ItemName
