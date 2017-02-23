// /control/users.js

var db = require('../models/db')

module.exports.encryptPassword = function encryptPassword (pass, cb) {
  console.log('*** *** *** *** Encriptando password')
  var encript = pass + 'a1'
  // falta el algoritmo de algoritmo de encriptamiento
  db(encript)
}
