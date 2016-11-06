const Entity = require('./Entity')

class ReceiveOrderUploadPattern extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_receiveorder_uploadpattern'
  }
}

module.exports = ReceiveOrderUploadPattern
