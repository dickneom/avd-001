module.exports.isSession = function (req, res, next) {
  console.log('(SESSION.JS) Validando session del usuario')
  if (typeof req.session.userLoged === 'undefined') {
    console.log('(SESSION.JS) Sesion NO validada')
    res.redirect('/login')
  } else {
    console.log('(SESSION.JS)  Sesion validada. Usuario: ' + req.session.userLoged.id)
    // Ya esta logeado
    next()
  }
}

module.exports.isAdmin = function (req, res, mext) {
  console.log('(SESSION.JS) Validando session del usuario')
  if (typeof req.session.userLoged === 'undefined') {
    dbIser
    console.log('(SESSION.JS) Sesion NO validada')
    res.redirect('/login')
  } else {
    console.log('(SESSION.JS)  Sesion validada. Usuario: ' + req.session.userLoged.id)
    // Ya esta logeado
    if (req.sesseion.userLogen.isAdmin)
      next()
    else {
        console.log('(SESSION.JS)  Acceso no autorizaofo. Usuario: ' + req.session.userLoged.id)
        res.send
    }
  }
}
