/* eslint-env mocha */

const assert = require('assert')
const Query = require('../lib/Query')
const Connection = require('../lib/Connection')

describe('Query', () => {
  describe('get DEFAULT_LIMIT', () => {
    it('must be 10000', () => {
      assert.equal(Query.DEFAULT_LIMIT, 10000)
    })
  })

  describe('count', () => {
    it('must return Promise', () => {
      const conn = new Connection()
      const q = new Query(conn)
      assert.ok(q.count() instanceof Promise)
    })
  })

  describe('get', () => {
    it('must return Promise', () => {
      const conn = new Connection()
      const q = new Query(conn)
      assert.ok(q.get() instanceof Promise)
    })
  })

  describe('getInBatches', () => {
    it('must return Promise', () => {
      const conn = new Connection()
      const q = new Query(conn)
      assert.ok(q.getInBatches() instanceof Promise)
    })
  })

  describe('limit', () => {
    it('must return fresh instance of Query', () => {
      const q = new Query()
      assert.notStrictEqual(q, q.limit(10))
    })
    it('must have limit option', () => {
      const expected = 9999
      const q = (new Query()).limit(expected)
      assert.equal(q.opts.limit, expected)
    })
  })

  describe('offset', () => {
    it('must return fresh instance of Query', () => {
      const q = new Query()
      assert.notStrictEqual(q, q.offset(100))
    })
    it('must have offset option', () => {
      const expected = 9999
      const q = (new Query()).offset(expected)
      assert.equal(q.opts.offset, expected)
    })
  })

  describe('where', () => {
    it('must return fresh instance of Query', () => {
      const q = new Query()
      assert.notStrictEqual(q, q.where())
    })
    it('must inherit exists conditions', () => {
      const q = (new Query()).where('hoge', '=', 'xxx').where('foo', '>', 100)
      assert.deepEqual(q.conditions, [
        ['hoge', '=', 'xxx'],
        ['foo', '>', 100]
      ])
    })
  })

  describe('fetch', () => {
    it('must return Promise', () => {
      const conn = new Connection()
      const q = new Query(conn)
      assert.ok(q.fetch([]) instanceof Promise)
    })
  })

  describe('request', () => {
    it('must return Promise', () => {
      const conn = new Connection()
      const q = new Query(conn)
      assert.ok(q.request({}, '') instanceof Promise)
    })
  })

  describe('toOperator', () => {
    it('must return eq if operator is `=`', () => {
      const q = new Query()
      assert.equal('eq', q.toOperator('='))
    })
    it('must return neq if operator is `!=`', () => {
      const q = new Query()
      assert.equal('neq', q.toOperator('!='))
    })
    it('must return neq if operator is `<>`', () => {
      const q = new Query()
      assert.equal('neq', q.toOperator('<>'))
    })
    it('must return gt if operator is `>`', () => {
      const q = new Query()
      assert.equal('gt', q.toOperator('>'))
    })
    it('must return gte if operator is `>=`', () => {
      const q = new Query()
      assert.equal('gte', q.toOperator('>='))
    })
    it('must return lt if operator is `<`', () => {
      const q = new Query()
      assert.equal('lt', q.toOperator('<'))
    })
    it('must return lte if operator is `<=`', () => {
      const q = new Query()
      assert.equal('lte', q.toOperator('<='))
    })
    it('must return in if operator is `IN`', () => {
      const q = new Query()
      assert.equal('in', q.toOperator('IN'))
    })
    it('must return null if operator is `IS NULL`', () => {
      const q = new Query()
      assert.equal('null', q.toOperator('IS NULL'))
    })
    it('must return nnull if operator is `IS NOT NULL`', () => {
      const q = new Query()
      assert.equal('nnull', q.toOperator('IS NOT NULL'))
    })
    it('must return blank if operator is `IS BLANK`', () => {
      const q = new Query()
      assert.equal('blank', q.toOperator('IS BLANK'))
    })
    it('must return nblank if operator is `NOT IS BLANK`', () => {
      const q = new Query()
      assert.equal('nblank', q.toOperator('IS NOT BLANK'))
    })
    it('must throw Error if mapping not exists', () => {
      const q = new Query()
      assert.throws(() => { q.toOperator('xxx') })
    })
  })

  describe('toParameter', () => {
    it('must return Object', () => {
      const q = new Query()
      assert.equal(typeof q.toParameter(), 'object')
    })
    it('must have limit if limit present', () => {
      const q = (new Query()).limit(1)
      const ret = q.toParameter()
      assert.ok('limit' in ret)
    })
    it('must have offset if offset present', () => {
      const q = (new Query()).offset(1)
      const ret = q.toParameter()
      assert.ok('offset' in ret)
    })
    it('must have all filter parameters', () => {
      const q = (new Query()).where('hoge', 'IN', [1, 2, 3]).where('foo', '<>', 300)
      const ret = q.toParameter()
      assert.ok('hoge-in' in ret)
      assert.ok('foo-neq' in ret)
    })
  })
})
