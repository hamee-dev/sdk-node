const Entity = require('./Entity')

class PaymentMethod extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_paymentmethod'
  }
}

module.exports = PaymentMethod
