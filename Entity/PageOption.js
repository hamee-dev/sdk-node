const Entity = require('./Entity')

/**
 * Alias of PageVariationOrOption
 */
class PageOption extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_master_pagebasevariationoroption'
  }
}

module.exports = PageOption
