var express = require('express')
var router = express.Router()

var db = require('../models/db')

var DRESSES_FOR_PAGE = 9

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('(DRESSES.JS) Atendiendo la ruta /dresses GET')
  console.log('Aqui nesecito presentar los vestidos solitados. Pero con node tengo que usar sequelize. Porque no hay como separar la busqueda de la presentacion.')

  //  Lo que quiero hacer:
  //  Determinar la cantidad de vestidos por página y la página a mostrar
  //  dresses = getDresses(limit, offset) // getVestidos es una funcion parte del modelo que me devuelve los vestidos
  //  showDresses(dresses) // showDresses es una funcion que muestra los vestidos
  //  Respuesta encontrada con node: TODO JUNTO.

  // Esto deberia estar aqui
  var limit = req.query.limit
  var page = req.query.page
  var offset

  if (!limit) { // Que verifico aquí  ??????????? Nadie lo sabe, o por lo menos Google no lo sabe
    limit = DRESSES_FOR_PAGE // Esto no es usa en node, habria que poner el 9
  }
  if (!page) { // Que verifico aquí  ??????????? Nadie lo sabe, o por lo menos Google no lo sabe
    page = 1
  }

  // ahora hay que decirle a node que limit y page son numeros
  limit = parseInt(limit, 10)
  page = parseInt(page, 10)
  offset = limit * (page - 1)

  console.log('(DRESSES.JS) limit: ', limit, ' page: ', page, ' offset: ', offset)
  // Esto deberia se parte del modelo o control
  db.Dress.findAll({
    limit: limit,
    offset: offset
  }).then(function (dresses) { // Agui meto una funcion anonima porque nadie sabe (ni Google) como ponerla afuera, si ya sé que este codigo lo voy a utilizar de nuevo, pero a reescribir, que mas dá
    console.log('(DRESSES.JS) dresses', dresses)
    for (var dress in dresses) {
      if (dresses.hasOwnProperty(dress)) {
        console.log('dress: ', dresses[dress].id)
      }
    }

    // Esto deberia ser parte del control, deberia ser una function, para reutilizar
    res.render('dresses/dresses', {
      title: 'Node es una mierda, y mas mierda y mas mierda',
      pageTitle: 'Vestidos',
      pageName: 'dresses',
      sessionUser: null,
      errors: null,
      dresses: dresses
    })
  }).catch(function (errors) { // Aqui capturo errores?????. Cuál?. Talvez un error producido en la busqueda de los vestidos
    console.log('(DRESSES.JS) ERROR en la busqueda. ' + errors) // Aqui presento el o los errores en el terminar
    res.send('(DRESSES.JS) ERROR en la busqueda. ' + errors) // Aqui presento el o los errores en el navegador
  })
})

module.exports = router
