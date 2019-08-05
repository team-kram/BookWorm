const isAuthenticated = (req, res, next) => {
  console.log('ASDAD')
  if (
    req.isAuthenticated() &&
    (req.user.admin || req.user.id === req.params.id)
  ) {
    return next()
  }
  //   if (req.user.admin || req.user.id === req.params.id) next()
  res.redirect('/')
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) next()
  res.redirect('/')
}

module.exports = {
  isAuthenticated,
  isAdmin
}
