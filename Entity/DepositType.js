const Entity = require('./Entity')

class DepositType extends Entity {
  static get getAsInfo () {
    return true
  }

  static get path () {
    return '/api_v1_system_deposittype'
  }
}

module.exports = DepositType
