const Entity = require('./Entity')

class ReceiveOrderForwardingagent extends Entity {
  static get getAsInfo () {
    return false
  }
  static get path () {
    return '/api_v1_receiveorder_forwardingagent'
  }
}

module.exports = ReceiveOrderForwardingagent
