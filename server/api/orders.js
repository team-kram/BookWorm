const router = require('express').Router()
const {Order, Book, User, OrderBook} = require('../db/models')
module.exports = router
// 'api/orders/'
// serve up orders for admin
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        completed: true
      },
      include: [{model: User}, {model: Book, through: OrderBook}]
    })
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

// serve up the order at req.params.id eager load order content + quantity
router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Order.findOrCreate({
      where: {
        userId: req.params.id
      },
      defaults: {completed: false, userId: req.params.id},
      include: [{model: Book, through: OrderBook}]
    })

    res.send(cart)
  } catch (err) {
    next(err)
  }
})

//buy a book
router.put('/addToCart/:userId', async (req, res, next) => {
  // req.body : isbn, quantity { isbn, quantity}
  try {
    const book = await Book.findOne({
      where: {
        id: req.body.bookId
      }
    })
    const order = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        completed: false
      },
      defaults: {
        completed: false,
        userId: req.params.userId
      },
      include: [{model: Book, through: OrderBook}]
    })
    await order.addBook(book, {through: {quantity: req.body.quantity}})
    res.status(201).send(order)
  } catch (err) {
    next(err)
  }
})
router.post('/purchase/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        completed: false
      }
    })
    if (!order) {
      res.status(404).send('Cart is empty')
    } else {
      await order.update({completed: true})
      res.sendStatus(201)
    }
  } catch (error) {
    next(error)
  }
})

// delete the order at req.params.id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = await Order.findById(req.params.id)
    res.send(id)
  } catch (err) {
    next(err)
  }
})

module.exports = router
