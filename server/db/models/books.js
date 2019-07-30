const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  title : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
      notEmpty : true
    }
  },
  imageUrl : {
    type : Sequelize.STRING,
    defaultValue : ''
  },
  description : {
    type : Sequelize.TEXT,
    allowNull : false,
    validate : {
      notEmpty : true
    }
  },
  author : {
    type : Sequelize.STRING
  },
  genre : {
    type : Sequelize.STRING
  },
  stock : {
    type : Sequelize.INTEGER
  },
  price : {
  }
})

module.exports = Book