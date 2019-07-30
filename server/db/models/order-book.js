const Sequelize = require('sequelize')
const db = require('../db')

const OrderBook = db.define('order-book', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderBook
