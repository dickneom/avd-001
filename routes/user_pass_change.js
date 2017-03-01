var express = require('express')
var router = express.Router()

var db = require('../models/db')
var controlSession = require('../control/session')
var controlUser = require('../control/users')

router.get('/pass_change', controlSession.isSession, function (req, res, next) {
  res.render('users/user_pass_change', {
    pageTitle: 'Cambio de contraseña',
    pageName: 'user_pass_change',
    sessionUser: req.session.userLoged,
    errors: null
  })
})

router.post('/pass_change', controlSession.isSession, function (req, res, next) {
  var userId = req.session.userLoged.id
  var passOld = controlUser.encryptPassword(req.body.passOld)

  controlUser.encryptPassword(passOld, function (passEncrypt) {
    var pass1 = req.body.pass1
    var pass2 = req.body.pass2

    var error

    db.User.findOne({
      where: {
        id: userId,
        password: passOld
      }
    }).then(function (user) {
      if (pass1 !== pass2) {
        error = 'Los contraseñas no coinciden.'
        res.render('users/user_pass_change', {
          pageTitle: 'Cambio de contraseña',
          pageName: 'user_pass_change',
          sessionUser: req.session.userLoged,
          errors: [error]
        })
      } else {
        controlUser.encryptPassword(pass1, function (pass1Ecprit) {
          user.update({password: pass1}).then(function (user) {
            res.send('Contraseña cambiada correctamente!')
          })
        })
      }
    }).catch(function (errors) {
      error = 'Contraseña incorrecta.'
      res.render('users/user_pass_change', {
        pageTitle: 'Cambio de contraseña',
        pageName: 'user_pass_change',
        sessionUser: req.session.userLoged,
        errors: [error]
      })
    })
  })
})

module.exports = router
