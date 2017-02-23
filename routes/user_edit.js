var express = require('express')
var router = express.Router()

var db = require('../models/db')

router.get('/:userId([0-9]+)/edit', function (req, res, next) {
  console.log('(USER_EDIT.JS) Atendiendo la ruta /users/:userId/edit GET')
  console.log('Aqui nesecito presentar el usuario a editar. Pero con node tengo que usar sequelize. Porque no hay como separar la busqueda de la presentacion.')

  // Lo que quiero hacer:
  // Determinar el usuario a mostrar
  // user = getuser(userId) // getusuario es una funcion parte del modelo que me devuelve un usuario
  // showuser(user) // showuser es una funcion que muestra un usuario
  // Respuesta encontrada con node: TODO JUNTO.

  // Esto deberia estar aqui
  var userId = req.params.userId
  console.log('(USER_EDIT.JS) userId: ', userId)

  if (userId) {
    // Esto deberia se parte del modelo o control
    db.User.findOne({
      where: {
        id: userId
      }
    }).then(function (user) { // Agui meto una funcion anonima porque nadie sabe (ni Google) como ponerla afuera, si ya sé que este codigo lo voy a utilizar de nuevo, pero a reescribir, que mas dá
      console.log('(USER_EDIT.JS) usuario encontrado. user: ', user.id)

      // Esto deberia ser parte del control, deberia ser una funcion, para reutilizar
      res.render('users/user_edit', {
        title: 'Node es una mierda, y mas mierda y mas mierda',
        pageTitle: 'Usuarios',
        pageName: 'user_edit',
        sessionUser: null,
        errors: null,
        user: user
      })
    }).catch(function (errors) { // Aqui capturo errores?????. Cuál?. Talvez un error producido en la busqueda de los usuarios
      console.log('(USER_EDIT.JS) ERROR en la busqueda. ' + errors) // Aqui presento el o los errores en el terminar
      res.send('(USER_EDIT.JS) ERROR en la busqueda. ' + errors) // Aqui presento el o los errores en el navegador
    })
  }
})

router.post('/edit', function (req, res, next) {
  console.log('(USER_CREATE.JS) Atendiendo la ruta /users/edit POST')
  console.log('Aqui nesecito mostrar un formulario vacio o lleno con los datos de un usuario ingresados. Pero con node tengo que usar sequelize. Porque no hay como separar la busqueda de la presentacion.')

  var userId = req.body.userId

  if (userId) {
    db.User.findOne({
      where: {
        id: userId
      }
    }).then(function (user) {
      user.nickname = req.body.nickname
      user.firstname = req.body.firstname
      user.lastname = req.body.lastname
      user.email = req.body.email
      user.birthdate = req.body.birthdate

      user.save().then(function (userNew) {
        res.render('users/user_edit', {
          title: 'Node es una mierda, y mas mierda y mas mierda',
          pageTitle: 'Usuarios',
          pageName: 'user_edit',
          sessionUser: null,
          errors: null,
          user: userNew
        })
      }).catch(function (errors) {
        res.render('users/user_edit', {
          title: 'Node es una mierda, y mas mierda y mas mierda',
          pageTitle: 'Usuarios',
          pageName: 'user_edit',
          sessionUser: null,
          errors: errors,
          user: user
        })
      })
    }).catch(function (errors) {
      console.log('(USER_EDIT.JS) ERROR en la busqueda. ' + errors)
      res.send('(USER_EDIT.JS) ERROR en la busqueda. ' + errors)
    })
  } else {
    console.log('(USER_EDIT.JS) ERROR el id del usuario no encontrado. ')
    res.send('(USER_EDIT.JS) ERROR el id del usuario no encontrado. ')
  }
})

module.exports = router
