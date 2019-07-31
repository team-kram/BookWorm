const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/:userId', async (req, res, next) => {
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

router.get('/:userId/cart', async (req, res, next) => {
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

router.get('/:userId/orders', async (req, res, next) => {
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

router.put('/:userId', async (req, res, next) => {
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

router.delete('/:userId', async (req, res, next) => {
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

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
