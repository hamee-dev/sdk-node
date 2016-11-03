# node-nextengine

A Nodejs wrapper for the Next Engine API [http://api.next-e.jp](http://api.next-e.jp)

## Installation

```
npm i -S next-engine
```

## Usage

please read [API Document](http://api.next-e.jp).

## Basic request

```js
const Nextengine = require('next-engine')

const client = new Nextengine({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessToken: credential.access_token,
  refreshToken: credential.refresh_token,
})

client.request('/api_v1_receiveorder_base/count', {
  'receive_order_shop_id-eq': 1
})
  .then(res => console.log('then:', res.count))
  .catch(e => console.error('catch:', e))
```

## Query utility

```js
// Query by path string(ex. /api_v1_receiveorder_base/count)
client.query('receiveorder_base')
  .where('receive_order_date', '>=', '2016-12-25 23:59:59')
  .count()
  .then(count => console.log(count))

// Query by Entity object
const { ReceiveOrder } = require('next-engine/Entity')
client.query(ReceiveOrder)
  .where('receive_order_id', '<>', 1)
  .count()
  .then(count => console.log(count))

// Get records
const { Goods } = require('next-engine/Entity')
client.query(Goods)
  .where('goods_id', 'abc')
  .limit(500)
  .offset(350)
  .get()
  .then(results => console.log(results))

// Get all records in batch
const { ReceiveOrder } = require('next-engine/Entity')
client.query(ReceiveOrder)
  .limit(300)
  .getInBatches(partial => console.log(partial))
  .then(() => console.log('Done'))
```

## Create / Update utility

```js
// Create shop
const { Shop } = require('next-engine/Entity')
const opts = {
  data: `
    <?xml version="1.0" encoding="utf-8"?>
    <root>
      <shop>
        <shop_mall_id>1</shop_mall_id>
        <shop_name>楽天店</shop_name>
        <shop_abbreviated_name>raku</shop_abbreviated_name>
        <shop_tax_id>1</shop_tax_id>
        <shop_tax_calculation_sequence_id>1</shop_tax_calculation_sequence_id>
        <shop_currency_unit_id>1</shop_currency_unit_id>
      </shop>
    </root>
  `
}

client.create(Shop, opts)
  .then(res => res.result)

// Update shop
const { Shop } = require('next-engine/Entity')
const opts = {
  receive_order_id: 1,
  receive_order_last_modified_date: '2016/01/01 00:00:00',
  data: `
    <?xml version="1.0" encoding="utf-8"?>
    <root>
      <receiveorder_base>
        <receive_order_shop_cut_form_id>12345-6789</receive_order_shop_cut_form_id>
        <receive_order_date>2014-05-01 00:00:00</receive_order_date>
      </receiveorder_base>
      <receiveorder_row>
        <receive_order_row_no value="1">
          <receive_order_row_goods_name>テスト商品</receive_order_row_goods_name>
          <receive_order_row_cancel_flag>1</receive_order_row_cancel_flag>
        </receive_order_row_no>
        <receive_order_row_no value="2">
          <receive_order_row_goods_name>テスト商品2</receive_order_row_goods_name>
        </receive_order_row_no>
        <receive_order_row_no value="3">
          <receive_order_row_quantity>3</receive_order_row_quantity>
        </receive_order_row_no>
      </receiveorder_row>
    </root>
  `
}

client.update(Shop, opts)
  .then(res => res.result)
```

## Upload / Queue utility

```js
const zlib = require('zlib')
const promisify = require('es6-promisify')
const stringify = promisify(require('csv-stringify'))
const deflate = promisify(zlib.deflate)
const { SUCCESS, FAILED }

input = [
  ['syohin_code', 'jan_code'],
  [ 'abc', '1234567890' ]
]
stringify(input)
  .then(csv => deflate(csv))
  .then(gz => client.upload({ data_type: 'gz', data: gz }))
  .then(queueId => client.waitFor(queueId, [SUCCESS, FAILED]))
  .then(() => console.log('Imported!'))

// Or
input = [
  ['syohin_code', 'jan_code'],
  [ 'abc', '1234567890' ]
]
stringify(input)
  .then(csv => deflate(csv))
  .then(gz => client.uploadAndWaitFor({ data_type: 'gz', data: gz }, [SUCCESS, FAILED]))
  .then(() => console.log('Imported!'))
```

## Contributing

1. Fork this repository
1. Create your feature branch & commit
1. Create a new pull request

## License

MIT
