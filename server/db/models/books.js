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
      'https://ebookclass.com/wp-content/uploads/2018/07/cracking-the-coding-interview-189-programming-questions-and-solutions-6th-edition-by-gayle-laakmann-mcdowell-ebook-pdf.jpg'
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
