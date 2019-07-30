const db = require('./db')

// register models
const { User, Order, Book } = require('./models')

module.exports = {
  db,
  User,
  Order,
  Book
}
