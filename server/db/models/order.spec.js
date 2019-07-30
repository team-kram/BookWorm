/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('orders')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let order1357

      beforeEach(async () => {
        order1357 = await Order.create({
          completed: false
        })
      })

      it('returns false', () => {
        expect(order1357.completed).to.be.equal(false)
      })
    })
  })
})
