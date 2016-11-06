/* eslint-env mocha */

const assert = require('assert')
const path = require('path')
const glob = require('glob')
const entities = require('../Entity')

describe('Entity', () => {
  describe('static get getAsInfo', () => {
    it('must return boolean', () => {
      for (let p in entities) {
        let entity = entities[p]
        assert.equal(typeof entity.getAsInfo, 'boolean', entity.name)
      }
    })
  })

  describe('static get path', () => {
    it('must starts with slash', () => {
      for (let p in entities) {
        let entity = entities[p]
        assert.equal(entity.path[0], '/', entity.name)
      }
    })

    it('must not contain trailing slash', () => {
      for (let p in entities) {
        let entity = entities[p]
        assert.notEqual(entity.path.substr(-1), '/', entity.name)
      }
    })
  })

  describe('Entity/*', () => {
    it('must export all entities', () => {
      const files = glob.sync(path.join(__dirname, '/../Entity/*.js'))
      for (let file of files) {
        const entityName = path.basename(file, '.js')
        if (entityName === 'Entity' || entityName === 'index') {
          continue
        }

        const entity = require(file)
        assert.ok(entities[entityName], entityName)
        assert.equal(entities[entityName], entity, entityName)
      }
    })
  })
})
