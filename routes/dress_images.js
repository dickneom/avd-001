var express = require('express')
var router = express.Router()

// PARA SUBIR LAS IMAGENES A CLOUDINARY
var cloudinary = require('cloudinary')  // sitio web para almacenar imagenes
var multer = require('multer')   // Para subir archivo (imagenes)
var uploader = multer({dest: './uploads'})

// configuracion de cloudinary para dresscloset
cloudinary.config({
  cloud_name: 'cloud-dc',
  api_key: '315662672528822',
  api_secret: 'HaVwA3NVQfm5cVMeTKYU3O5Di7s'
})

var db = require('../models/db')
var controlSession = require('../control/session')
var controlDresses = require('../control/dresses')

/**
/ Medoto GET para la ruta dresses/:idDress/update, para actualizar la informacion de un vestido
*/
router.get('/:dressId([0-9]+)/images', controlSession.isSession, controlDresses.isOwnerDress, function (req, res, next) {
  console.log('(DRESS_IMAGES.JS) Atendiendo la ruta /dresses/:dressId/images GET')
  console.log('Aqui nesecito presentar el vestido a editar. Pero con node tengo que usar sequelize. Porque no hay como separar la busqueda de la presentacion.')

  // Lo que quiero hacer:
  // Determinar el vestido a mostrar
  // dress = getDress(dressId) // getVestido es una funcion parte del modelo que me devuelve un vestido
  // showDress(dress) // showDress es una funcion que muestra un vestido
  // Respuesta encontrada con node: TODO JUNTO. buscar el vestido, que hacer con el vestido, y capaturar el error, y ver que hacer con el error

  // Esto deberia estar aqui
  var dressId = req.params.dressId
  console.log('(DRESS_UPDATE.JS) dressId: ', dressId)

  if (dressId) {
    // Esto deberia se parte del modelo o control
    db.Dress.findOne({
      where: {
        id: dressId
      }
    }).then(function (dress) { // Agui meto una funcion anonima porque nadie sabe (ni Google) como ponerla afuera, si ya sé que este codigo lo voy a utilizar de nuevo, pero a reescribir, que mas dá
      console.log('(DRESS_IMAGES.JS) Vestido encontrado. dress: ', dress.id)

      // Determinar el usuario logeado, null si no esta logeado
      var userLoged = null
      if (req.session.userLoged) {
        userLoged = req.session.userLoged
      }
      // Esto deberia ser parte del control, deberia ser una funcion, para reutilizar
      console.log('(DRESS_IMAGES.JS) Mostrando vestido para edicion.')
      res.render('dresses/dress_images', {
        title: 'Node es una mierda, y mas mierda y mas mierda',
        pageTitle: 'Agregar imagen al vestido',
        pageName: 'dress_images',
        sessionUser: userLoged,
        errors: null,
        dress: dress
      })
    }).catch(function (errors) { // Aqui capturo errores?????. Cuál?. Talvez un error producido en la busqueda de los vestidos
      console.log('(DRESS_IMAGES.JS) ERROR (dress) en la busqueda. ' + errors) // Aqui presento el o los errores en el terminar
      res.send('(DRESS_IMAGES.JS) ERROR (dress) en la busqueda. ' + errors) // Aqui presento el o los errores en el navegador
    })
  }
})

/**
/ Medoto POST para la ruta dresses/update, para actualizar la informacion de un vestido
*/
router.post('/images', controlSession.isSession, uploader.single('image'), controlDresses.isOwnerDress, function (req, res, next) {
  console.log('(DRESS_IMAGES.JS) Atendiendo la ruta /dresses/images POST')
  if (req.file) {
    var dressId = req.body.dressId

    if (dressId) {
      db.Dress.findOne({
        where: {
          id: dressId
        }
      }).then(function (dress) {
        cloudinary.uploader.upload(req.file.path, function (result) {
          var fileUrl = result.url
          // var fileSecureUrl = result.secure_url

          dress.image = fileUrl
          dress.stateId = 1
          console.log('********* Vestido a grabar: ' + dress)

          dress.save().then(function (dressNew) {
            console.log('(DRESS_IMAGES.JS) Vestido grabado correctamente.')
            res.render('dresses/dress_images', {
              pageTitle: 'Agregar imagen al vestido: ' + dress.title,
              pageName: 'dress_images',
              sessionUser: req.session.userLoged,
              errors: null,
              dress: dressNew
            })
          }).catch(function (errors) {
            console.log('(DRESS_IMAGES.JS) Vestido no se grabo.')
            res.render('dresses/dress_images', {
              pageTitle: 'Agregar imagen al vestido: ' + dress.title,
              pageName: 'dress_images',
              sessionUser: req.session.userLoged,
              errors: errors,
              dress: dress
            })
          })
        })
      }).catch(function (errors) {
        console.log('(DRESS_IMAGES.JS) ERROR en la busqueda del vestido')
        res.send('(DRESS_IMAGES.JS) ERROR en la busqueda del vestido. ')
      })
    } else {
      console.log('(DRESS_IMAGES.JS) ERROR el id del vestido no encontrado. ')
      res.send('(DRESS_IMAGES.JS) ERROR el id del vestido no encontrado. ')
    }
  } else {
    console.log('(DRESS_IMAGES.JS) ERROR ningun archivo pasado.')
    res.send('(DRESS_IMAGES.JS) ERROR ningun archivo pasado.')
  }
})

module.exports = router
