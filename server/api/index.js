const router = require('express').Router()
const usersRouter = require('./users')
// const ordersRouter = require('./orders')
const booksRouter = require('./books')

router.use('/users', usersRouter)
// router.use('/orders', ordersRouter);
router.use('/books', booksRouter)

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
