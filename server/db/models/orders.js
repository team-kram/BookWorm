const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Order
