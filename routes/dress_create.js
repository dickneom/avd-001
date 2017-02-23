var express = require('express')
var router = express.Router()

var db = require('../models/db')

var IMAG_DRESS_ANON = 'http://res.cloudinary.com/cloud-dc/image/upload/v1487441736/brwltuenzajetyxciozo.png'

router.get('/create', function (req, res, next) {
  console.log('(DRESS_CREATE.JS) Atendiendo la ruta /dresses/create GET')
  console.log('Aqui nesecito mostrar un formulario vacio o lleno con los datos de un vestido ingresados. Pero con node tengo que usar sequelize. Porque no hay como separar la busqueda de la presentacion.')

  res.render('dresses/dress_create', {
    title: 'Node es una mierda, y mas mierda y mas mierda',
    pageTitle: 'Vestidos',
    pageName: 'dress_create',
    sessionUser: null,
    errors: null,
    dress: null
  })
})

router.post('/create', function (req, res, next) {
  console.log('(DRESS_CREATE.JS) Atendiendo la ruta /dresses/create POST')
  console.log('Aqui nesecito mostrar un formulario vacio o lleno con los datos de un vestido ingresados. Pero con node tengo que usar sequelize. Porque no hay como separar la busqueda de la presentacion.')

  var dress = {}
  dress.title = req.body.title
  dress.description = req.body.description
  dress.colorId = req.body.colorId
  dress.brandId = req.body.brandId
  dress.price = req.body.price
  dress.priceOriginal = req.body.priceOriginal
  dress.userId = req.body.userId
  dress.image = IMAG_DRESS_ANON

  db.Dress.create(dress).then(function (dressNew) {
    res.redirect('/dresses/' + dressNew.id + '/edit')
  }).catch(function (errors) {
    res.render('dresses/dress_create', {
      title: 'Node es una mierda, y mas mierda y mas mierda',
      pageTitle: 'Vestidos',
      pageName: 'dress_create',
      sessionUser: null,
      errors: errors,
      dress: dress
    })
  })
})

module.exports = router
