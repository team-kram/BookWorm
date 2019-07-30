const router = require('express').Router()
const {Order, Book} = require('../db/models')
module.exports = router
// 'api/orders/'
// router.get('/', async (req, res, next) => {
//   try{
//     const orders = await Order.findAll({

//       includes : [
//         {model : User}
//       ]
//     })
//   }catch(err){
//     next(err)
//   }
// })

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id, {
      includes: [{model: Book}],
      where: {
        orderbookId: req.params.id
      }
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = await Order.findById(req.params.id)
    res.send(id)
  } catch (err) {
    next(err)
  }
})

module.exports = router
