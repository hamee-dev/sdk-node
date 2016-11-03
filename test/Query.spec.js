
describe('Query', () => {
  describe('get DEFAULT_LIMIT', () => {
    it('must be 10000')
  })

  describe('count', () => {
    it('must return Promise')
    it('must pass integer if Promise fulfilled')
  })

  describe('get', () => {
    it('must return Promise')
    it('must pass unwrapped Object if Promise fulfilled')
  })

  describe('getInBatches', () => {
    it('must return Promise')
    it('must call iteratee if response not empty')
  })

  describe('limit', () => {
    it('must return fresh instance of Query')
    it('must have limit option')
  })

  describe('offset', () => {
    it('must return fresh instance of Query')
    it('must have offset option')
  })

  describe('where', () => {
    it('must return fresh instance of Query')
    it('must inherit exists conditions')
  })

  describe('fetch', () => {
    it('must return Promise')
  })

  describe('request', () => {
    it('must return Promise')
  })

  describe('toOperator', () => {
    it('must return NE-operator if mapping exists')
    it('must throw Error if mapping not exists')
  })

  describe('toParameter', () => {
    it('must return Object')
    it('must have limit if limit present')
    it('must have offset if offset present')
    it('must have all filter parameters')
  })
})
