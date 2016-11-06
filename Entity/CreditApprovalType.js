const Entity = require('./Entity')

class CreditApprovalType extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_creditapprovaltype'
  }
}

module.exports = CreditApprovalType
