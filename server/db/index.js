const db = require('./db')

const {User, Order, Book, OrderBook} = require('./models')
User.hasMany(Order)
Order.belongsTo(User)

//Order and Book : many to many
Book.belongsToMany(Order, {through: OrderBook})
Order.belongsToMany(Book, {through: OrderBook})

module.exports = db
