const Sequelize = require('sequelize')
const db = require('../db')

const OrderBook = db.define('order-book', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    minimumValue: 0
  }
})

module.exports = OrderBook
