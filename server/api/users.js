const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:UserId', async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        id: req.params.UserId
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

router.get('/:UserId/cart', async (req, res, next) => {
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

router.get('/:UserId/orders', async (req, res, next) => {
  try {
    const user = await User.findOne({
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

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOrCreate({
      where: {
        isbn: req.body.isbn
      }
    })
    res.send(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:UserId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.UserId)
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
router.delete('/:UserId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.UserId)
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
