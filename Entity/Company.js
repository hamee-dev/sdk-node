const Entity = require('./Entity')

class Company extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_login_company'
  }
}

module.exports = Company
