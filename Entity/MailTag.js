const Entity = require('./Entity')

class MailTag extends Entity {
  static get getAsInfo () {
    return false
  }

  static get path () {
    return '/api_v1_master_mailtag'
  }
}

module.exports = MailTag
