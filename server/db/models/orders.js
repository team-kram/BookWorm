const Sequelize = require('sequelize')
const db = require('../db')
const OrderBook = require('./order-book')

const Order = db.define('order', {
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Order
