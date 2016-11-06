const Entity = require('./Entity')

class UploadQueue extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_system_que'
  }
}

module.exports = UploadQueue
