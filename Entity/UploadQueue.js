const Entity = require('./Entity')

class UploadQueue extends Entity {
  static get COMPLETED () {
    return 2
  }

  static get FAILED () {
    return -1
  }

  static get IN_PROGRESS () {
    return 1
  }

  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_system_que'
  }
}

module.exports = UploadQueue
