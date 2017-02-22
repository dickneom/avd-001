var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('(USERS.JS) Atendiendo la ruta /users/ GET')
  db.User.findAll().then(function (users) {
  	res.render('users/users', {
  		pageTile: 'Lista de Usuarios',
  		pageName: 'users',
  		sessionUser: null,
  		errors: null,
      users: users
  	})
  }).catch()
});

module.exports = router;
