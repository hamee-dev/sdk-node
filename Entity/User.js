const Entity = require('./Entity')

class User extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_login_user'
  }
}

module.exports = User
