
const path = require('path')

class Path {
  static resolve (pathOrEntity, suffix) {
    if (typeof pathOrEntity === 'string') {
      return `/api_v1_${pathOrEntity}/${suffix}`
    } else if (suffix === 'search') {
      return path.join(pathOrEntity.path, pathOrEntity.getAsInfo ? 'info' : suffix)
    } else {
      return path.join(pathOrEntity.path, suffix)
    }
  }
}

module.exports = Path
