
class Path {
  static resolve (pathOrEntity, suffix) {
    if (typeof pathOrEntity === 'string') {
      return `/api_v1_${pathOrEntity}/${suffix}`
    } else {
      return this.findPath(pathOrEntity)
    }
  }

  static findPath (entity) {
    return ''
  }
}

module.exports = Path
