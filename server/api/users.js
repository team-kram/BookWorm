const router = require('express').Router()
const {User, Order} = require('../db/models')
const {isAuthenticated, isAdmin} = require('./authentication')

// get all users, protected
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'email', 'address', 'admin']
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
})

// create user, unprotected
router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOrCreate({
      where: {
        id: req.body.id
      }
    })
    res.send(user)
  } catch (error) {
    next(error)
  }
})

// get user by id, protected
router.get('/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        id: req.params.userId
      },
      attributes: ['id', 'email']
    })
    if (!user) {
      res.sendStatus(404)
    } else {
      res.send(user)
    }
  } catch (error) {
    next(error)
  }
})

// get users's cart, protected
router.get('/:userId/cart', isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Order,
          where: {
            completed: false
          }
        }
      ]
    })
    if (!user) {
      res.sendStatus(404)
    } else {
      res.send(user)
    }
  } catch (error) {
    next(error)
  }
})

// get user's orders, protected
router.get('/:userId/orders', isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findAll({
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
    if (!user) {
      res.sendStatus(404)
    } else {
      res.send(user)
    }
  } catch (error) {
    next(error)
  }
})

// edit user info, protected
router.put('/:userId', isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      res.sendStatus(404)
    } else {
      await user.update(req.body)
      res.send(user)
    }
  } catch (error) {
    next(error)
  }
})

// delete user, protected
router.delete('/:userId', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      res.sendStatus(404)
    } else {
      await user.destroy()
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
