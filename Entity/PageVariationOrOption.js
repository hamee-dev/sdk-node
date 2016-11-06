const Entity = require('./Entity')

class PageVariationOrOption extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_master_pagebasevariationoroption'
  }
}

module.exports = PageVariationOrOption
