const isAuthenticated = (req, res, next) => {
  if (req.user.admin || req.user.id === req.params.userId) next()
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
