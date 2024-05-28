const sessionUserToLocal = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null
    next()
}

module.exports = sessionUserToLocal