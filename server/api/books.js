const router = require('express').Router()
const {Book, Order} = require('../db/models')
const {isAuthenticated, isAdmin} = require('./authentication')

// get all books, unprotected
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      attributes: [
        'id',
        'title',
        'isbn',
        'author',
        'genre',
        'price',
        'stock',
        'description',
        'imageUrl'
      ]
    })
    res.send(books)
  } catch (error) {
    next(error)
  }
})

// get book by id, unprotected
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      attributes: [
        'id',
        'title',
        'isbn',
        'author',
        'genre',
        'price',
        'stock',
        'description',
        'imageUrl'
      ]
    })
    if (!book) {
      res.sendStatus(404)
    } else {
      res.send(book)
    }
  } catch (error) {
    next(error)
  }
})

// get order by book's id
router.get('/:id/orders', isAuthenticated, async (req, res, next) => {
  try {
    const book = await Book.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Order,
          where: {
            completed: true
          }
        }
      ]
    })
    if (!book) {
      res.sendStatus(404)
    } else {
      res.send(book)
    }
  } catch (error) {
    next(error)
  }
})

// add book, protected
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const book = await Book.findOrCreate({
      where: {
        isbn: req.body.isbn
      }
    })
    res.send(book)
  } catch (error) {
    next(error)
  }
})

// edit book, protected
router.put('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id)
    if (!book) {
      res.sendStatus(404)
    } else {
      const body = {
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        stock: req.body.stock,
        genre: req.body.genre
      }
      await book.update(body)
      res.send(book)
    }
  } catch (error) {
    next(error)
  }
})

// delete book, protected
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id)
    if (!book) {
      res.sendStatus(404)
    } else {
      await book.destroy()
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
