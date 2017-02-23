var express = require('express')
var router = express.Router()

var db = require('../models/db')

router.get('/:dressId([0-9]+)/edit', function (req, res, next) {
  console.log('(DRESS_EDIT.JS) Atendiendo la ruta /dresses/:dressId/edit GET')
  console.log('Aqui nesecito presentar el vestido a editar. Pero con node tengo que usar sequelize. Porque no hay como separar la busqueda de la presentacion.')

  // Lo que quiero hacer:
  // Determinar el vestido a mostrar
  // dress = getDress(dressId) // getVestido es una funcion parte del modelo que me devuelve un vestido
  // showDress(dress) // showDress es una funcion que muestra un vestido
  // Respuesta encontrada con node: TODO JUNTO.

  // Esto deberia estar aqui
  var dressId = req.params.dressId
  console.log('(DRESS_EDIT.JS) dressId: ', dressId)

  if (dressId) {
    // Esto deberia se parte del modelo o control
    db.Dress.findOne({
      where: {
        id: dressId
      }
    }).then(function (dress) { // Agui meto una funcion anonima porque nadie sabe (ni Google) como ponerla afuera, si ya sé que este codigo lo voy a utilizar de nuevo, pero a reescribir, que mas dá
      console.log('(DRESS_EDIT.JS) Vestido encontrado. dress: ', dress.id)

      // Esto deberia ser parte del control, deberia ser una funcion, para reutilizar
      res.render('dresses/dress_edit', {
        title: 'Node es una mierda, y mas mierda y mas mierda',
        pageTitle: 'Vestidos',
        pageName: 'dress_edit',
        sessionUser: null,
        errors: null,
        dress: dress
      })
    }).catch(function (errors) { // Aqui capturo errores?????. Cuál?. Talvez un error producido en la busqueda de los vestidos
      console.log('(DRESS_EDIT.JS) ERROR en la busqueda. ' + errors) // Aqui presento el o los errores en el terminar
      res.send('(DRESS_EDIT.JS) ERROR en la busqueda. ' + errors) // Aqui presento el o los errores en el navegador
    })
  }
})

router.post('/edit', function (req, res, next) {
  console.log('(DRESS_CREATE.JS) Atendiendo la ruta /dresses/edit POST')
  console.log('Aqui nesecito mostrar un formulario vacio o lleno con los datos de un vestido ingresados. Pero con node tengo que usar sequelize. Porque no hay como separar la busqueda de la presentacion.')

  var dressId = req.body.dressId

  if (dressId) {
    db.Dress.findOne({
      where: {
        id: dressId
      }
    }).then(function (dress) {
      dress.title = req.body.title
      dress.description = req.body.description
      dress.colorId = req.body.colorId
      dress.brandId = req.body.brandId
      dress.price = req.body.price
      dress.priceOriginal = req.body.priceOriginal

      dress.save().then(function (dressNew) {
        res.render('dresses/dress_edit', {
          title: 'Node es una mierda, y mas mierda y mas mierda',
          pageTitle: 'Vestidos',
          pageName: 'dress_edit',
          sessionUser: null,
          errors: null,
          dress: dressNew
        })
      }).catch(function (errors) {
        res.render('dresses/dress_edit', {
          title: 'Node es una mierda, y mas mierda y mas mierda',
          pageTitle: 'Vestidos',
          pageName: 'dress_edit',
          sessionUser: null,
          errors: errors,
          dress: dress
        })
      })
    }).catch(function (errors) {
      console.log('(DRESS_EDIT.JS) ERROR en la busqueda. ' + errors)
      res.send('(DRESS_EDIT.JS) ERROR en la busqueda. ' + errors)
    })
  } else {
    console.log('(DRESS_EDIT.JS) ERROR el id del vestido no encontrado. ')
    res.send('(DRESS_EDIT.JS) ERROR el id del vestido no encontrado. ')
  }
})

module.exports = router
