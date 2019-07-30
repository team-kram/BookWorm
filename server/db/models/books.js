const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://i.pinimg.com/originals/b8/bd/3f/b8bd3f935d3c7270a454da6903096706.jpg'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  author: {
    type: Sequelize.STRING
  },
  genre: {
    type: Sequelize.STRING
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  isbn: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Book
