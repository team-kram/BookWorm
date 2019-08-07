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
router.get('/:userId', isAuthenticated, async (req, res, next) => {
  try {
    let cart = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        completed: false
      },
      defaults: {completed: false, userId: req.params.userId}
    })
    cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        completed: false
      },
      include: [{model: Book, through: OrderBook}]
    })

    res.send(cart)
  } catch (err) {
    next(err)
  }
})

//buy a book
router.put('/addToCart/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const {quantity} = req.body
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
      through: {quantity: parseInt(quantity)}
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

router.delete('/removeCart', isAuthenticated, async (req, res, next) => {
  try {
    const {bookId, orderId} = req.body
    const book = await Book.findByPk(bookId)
    const order = await Order.findByPk(orderId)
    await order.removeBook(book)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.put('/editCart', isAuthenticated, async (req, res, next) => {
  try {
    const {bookId, orderId} = req.body
    const item = await OrderBook.findOne({
      where: {
        bookId,
        orderId
      }
    })
    const body = {
      quantity: req.body.quantity
    }
    await item.update(body)
    res.send(item)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const id = await Order.findById(req.params.id)
    res.send(id)
  } catch (err) {
    next(err)
  }
})

router.put('/completed/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId
      },
      include: [{model: Book, through: OrderBook}]
    })
    await order.update({completed: true})
    res.send(order)
  } catch (error) {
    next(error)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        completed: false,
        userId: req.params.userId
      }
    })
    if (!cart) {
      await Order.create({completed: false})
      res.sendStatus(201)
    } else {
      res.send('Cart already exists')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
