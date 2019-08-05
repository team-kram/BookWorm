const isAuthenticated = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    (req.user.admin || req.user.id === parseInt(req.params.userId))
  ) {
    return next()
  }
  res.redirect('/')
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    return next()
  }
  res.redirect('/')
}

module.exports = {
  isAuthenticated,
  isAdmin
}
