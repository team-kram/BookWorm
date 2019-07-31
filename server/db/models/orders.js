const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },

  orderNumber: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Order.beforeValidate((order, options) => {
  order.orderNumber = makeOrderNumber()
})

function makeOrderNumber() {
  let result = ''
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
module.exports = Order
