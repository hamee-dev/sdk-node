
const objectPath = require('object-path')

module.exports = {
  digg: (path) => (obj) => {
    return objectPath.get(obj, path)
  }
}
