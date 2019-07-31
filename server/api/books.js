const router = require('express').Router()
const {Book, Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll()
    res.send(books)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id)
    if (!book) {
      res.sendStatus(404)
    } else {
      res.send(book)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id/orders', async (req, res, next) => {
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
router.post('/', async (req, res, next) => {
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
router.put('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id)
    if (!book) {
      res.sendStatus(404)
    } else {
      await book.update(req.body)
      res.send(book)
    }
  } catch (error) {
    next(error)
  }
})
router.delete('/:id', async (req, res, next) => {
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
