const router = require('express').Router()
const {Order, Book, User, OrderBook} = require('../db/models')
const {isAuthenticated, isAdmin} = require('./authentication')

// 'api/orders/'
// serve up orders for admin
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        completed: true
      },
      include: [{model: User}, {model: Book, through: OrderBook}]
    })
    console.log(req.user)
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/completed/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        completed: true,
        userId: req.params.userId
      },
      include: [{model: Book, through: OrderBook}]
    })
    res.send(orders)
  } catch (error) {
    next(error)
  }
})

// serve up the order at req.params.id eager load order content + quantity
router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const cart = await Order.findOrCreate({
      where: {
        userId: req.params.id,
        completed: false
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
router.put('/addToCart/:userId', isAuthenticated, async (req, res, next) => {
  // req.body : isbn, quantity { isbn, quantity}
  try {
    const book = await Book.findByPk(req.body.id)
    let order = await Order.findOne({
      where: {
        userId: parseInt(req.params.userId),
        completed: false
      }
    })
    if (!order) {
      order = await Order.create({
        completed: false
      })
    }
    await order.addBook(book, {
      through: {quantity: parseInt(req.body.quantity)}
    })
    let books = await order.getBooks()
    res.send(books)
  } catch (err) {
    next(err)
  }
})

router.post('/purchase/:userId', isAuthenticated, async (req, res, next) => {
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

// delete the order at req.params.id, protected
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const id = await Order.findById(req.params.id)
    res.send(id)
  } catch (err) {
    next(err)
  }
})

module.exports = router
