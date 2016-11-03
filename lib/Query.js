
const Path = require('./Path')
const { digg } = require('./util')

/**
 *
 */
class Query {
  static get DEFAULT_LIMIT () {
    return 10000
  }

  /**
   *
   */
  constructor (connection, pathOrEntity, conditions, opts) {
    conditions = conditions || []

    this.connection = connection
    this.pathOrEntity = pathOrEntity
    this.conditions = conditions
    this.opts = opts
  }

  /**
   *
   */
  count () {
    return this.fetch([], 'count').then(digg('count'))
  }

  /**
   *
   */
  get (fields) {
    return this.fetch(fields, 'search').then(digg('data'))
  }

  /**
   *
   */
  getInBatches (fields, iteratee) {
    const limit = this.opts.limit || Query.DEFAULT_LIMIT
    const offset = this.opts.offset || 0

    return this.limit(limit).offset(offset).fetch(fields, 'search')
      .then(partial => {
        if (partial.length > 0) {
          return iteratee(partial)
            .then(() => this.offset(offset).getInBatches(fields, iteratee))
        }
      })
  }

  /**
   *
   */
  limit (limit) {
    const opts = Object.assign({}, this.opts, { limit: limit })
    return new Query(this.connection, this.pathOrEntity, this.conditions, opts)
  }

  /**
   *
   */
  offset (offset) {
    const opts = Object.assign({}, this.opts, { offset: offset })
    return new Query(this.connection, this.pathOrEntity, this.conditions, opts)
  }

  /**
   *
   */
  where (field, operator, value) {
    const condition = [field, operator, value]
    const conditions = this.conditions.concat([condition])
    return new Query(this.connection, this.pathOrEntity, conditions, this.opts)
  }

  /**
   *
   */
  fetch (fields, suffix) {
    const where = this.toParameter(this.conditions)
    const params = Object.assign(where, { fields })

    return this.request(params, suffix)
  }

  /**
   *
   */
  request (params, suffix) {
    const path = Path.resolve(this.pathOrEntity, suffix)

    return this.connection.request('POST', path, params)
  }

  toOperator (operator) {
    switch (operator.toLowerCase()) {
      case '=':
        return 'eq'
      case '!=':
      case '<>':
        return 'neq'
      case '>':
        return 'gt'
      case '>=':
        return 'gte'
      case '<':
        return 'lt'
      case '<=':
        return 'lte'
      case 'in':
        return 'in'
      case 'not in':
        return 'nin'
      case 'like':
        return 'like'
      case 'not like':
        return 'nlike'
      case 'is null':
        return 'null'
      case 'is not null':
        return 'nnull'
      case 'is blank':
        return 'blank'
      case 'is not blank':
        return 'nblank'
      default:
        throw new Error('Unknown operator: ' + operator)
    }
  }

  toParameter () {
    const where = this.conditions.reduce((acc, condition) => {
      const [field, operator, value] = condition
      acc[`${field}-${this.toOperator(operator)}`] = value
      return acc
    }, {})

    return Object.assign(where, this.opts)
  }
}

module.exports = Query
