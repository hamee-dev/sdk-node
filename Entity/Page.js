const Entity = require('./Entity')

class Page extends Entity {
  static get getAsInfo () {
    return false
  }
  static get path () {
    return '/api_v1_master_pagebase'
  }
}

module.exports = Page
