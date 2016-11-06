const Entity = require('./Entity')

class SocialInsurance extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_socialinsurance'
  }
}

module.exports = SocialInsurance
