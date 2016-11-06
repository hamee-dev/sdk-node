
const path = require('path')

class Path {
  static resolve (pathOrEntity, suffix) {
    if (typeof pathOrEntity === 'string') {
      return `/api_v1_${pathOrEntity}/${suffix}`
    } else {
      return path.join(pathOrEntity.path, pathOrEntity.getAsInfo ? 'info' : `${suffix}`)
    }
  }
}

module.exports = Path
