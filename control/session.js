/**
/ Verifica que el usuario esta logeado
*/
module.exports.isSession = function (req, res, next) {
  console.log('(SESSION.JS) Validando session del usuario')
  if (typeof req.session.userLoged === 'undefined') {
    console.log('(SESSION.JS) Sesion NO validada')
    res.redirect('/login')
  } else {
    console.log('(SESSION.JS)  Sesion validada. Usuario: ' + req.session.userLoged.id)
    next()
  }
}

/**
/ Verifica que el usuario esta logeado y es administrador
*/
module.exports.isAdmin = function (req, res, next) {
  console.log('(SESSION.JS) Validando si el usuario esta logueado y es administrador')

  if (typeof req.session.userLoged === 'undefined') {
    console.log('(SESSION.JS)  Usuario no logeado.')
    res.send('(SESSION.JS)  Usuario no logeado')
  } else {
    if (req.sesseion.userLogen.isAdmin) {
      console.log('(SESSION.JS)  Acceso autorizaofo. Usuario: ' + req.session.userLoged.id)
      next()
    } else {
      console.log('(SESSION.JS)  Acceso no autorizaofo. Usuario: ' + req.session.userLoged.id)
      res.send('(SESSION.JS)  Acceso no autorizaofo. Usuario: ' + req.session.userLoged.id)
    }
  }
}

/**
/ Inicia una session
*/
module.exports.sessionInit = function sessionInit (req, res, user, rememberme) {
  req.session.userLoged = {
    id: user.id,
    nickname: user.nickname,
    fullname: user.fullname,
    email: user.email,
    isAdmin: user.isAdmin
  }
  console.log('(SESSION.JS) *** *** *** *** Session iniciada')
}

/**
/ Verifica si el usuario logeado esta autenticado
*/
module.exports.isAuthenticado = function isAuthenticado () {

}
