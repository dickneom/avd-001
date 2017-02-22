var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('(INDEX.JS) Atendiendo la ruta / GET')
//	db.Dress.findAll().then (function (dresses) {
	var dresses = getDresses()
	console.log('Vestidos recibidos ' + dresses.length);
		res.render('dresses/dresses', {
			pageTitle: 'Vestidos',
			pageName: 'dresses',
			sessionUser: null,
			errors: null,
			dresses: dresses
		})
//	}).catch()
})

var db = require('../models/db')

var getDresses = function () {
	db.Dress.findAll().then(function (dresses) {
		console.log('Encontrados los vestidos ' + dresses.length);
		return dresses
	})
}

module.exports = router;
