const Sequelize = require('sequelize')
const db = require('../db')
const OrderBook = require('./order-book')

const Order = db.define('order', {
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

Order.prototype.addBook = async function(book, quantity) {
  await OrderBook.create({
    quantity,
    bookId: book.id,
    orderId: this.id
  })
  return this
}

module.exports = Order
