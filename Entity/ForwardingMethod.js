const Entity = require('./Entity')

class ForwardingMethod extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_forwardingmethod'
  }
}

module.exports = ForwardingMethod
