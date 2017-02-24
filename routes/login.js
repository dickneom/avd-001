var express = require('express')
var router = express.Router()

var db = require('../models/db')
var controlUser = require('../control/users')

router.get('/', function (req, res, next) {
  res.render('login/login', {
    title: 'Node es una mierda, y mas mierda y mas mierda',
    pageTitle: 'Ingreso',
    pageName: 'login',
    sessionUser: null,
    errors: null
  })
})

router.post('/', function (req, res, next) {
  var error
  var email = req.body.email
  var password = req.body.password
  var rememberme = req.body.rememberme

  controlUser.encryptPassword(password, function (passEncrypt) {
    db.User.findOne({
      where: {
        email: email,
        password: passEncrypt
      }
    }).then(function (user) {
      if (user) {
        if (user.authenticated) {
          console.log('(LOGIN.JS) ****** Usuario validado y autentidado')
          req.session.userLoged = {
            id: user.id,
            nickname: user.nickname,
            fullname: user.fullname,
            email: user.email,
            isAdmin: user.isAdmin
          }
          console.log('(LOGIN.JS) ****** Redirecsionando a: ' + req.session.urlGet)
          if (req.session.urlGet) {
            res.redirect(req.session.urlGet)
          } else {
            res.redirect('/')
          }
        } else {
          error = 'Usuario validado pero no autentidado'
          console.log('(LOGIN.JS) *** ERROR: ' + error)
          res.render('login/login', {
            pageTitle: 'Ingreso',
            pageName: 'login',
            sessionUser: null,
            errors: [error]
          })
        }
      } else {
        error = 'Email y/o password no validos'
        console.log('(LOGIN.JS) *** ERROR: ' + error)
        res.render('login/login', {
          pageTitle: 'Ingreso',
          pageName: 'login',
          sessionUser: null,
          errors: [error]
        })
      }
    }).catch(function (errors) {
      console.log('(LOGIN.JS) *** ERROR: en la busqueda (login.js)' + errors)
      res.send(errors)
    })
  })
})

module.exports = router
