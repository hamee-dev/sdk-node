
class Entity {
  /**
   * should convert 'search' to 'info' or not
   *
   * @return bool true:should convert, false:should not convert
   */
  static get getAsInfo () {
    return false
  }

  /**
   * return request path of this API
   *
   * path must starts with spash
   * path must not contain trailing spash
   *
   * @return string
   */
  static get path () {
    return '/'
  }
}

module.exports = Entity
