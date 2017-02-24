// /control/users.js

var db = require('../models/db')

/**
/ Encripta el password
*/
module.exports.encryptPassword = function encryptPassword (pass, cb) {
  console.log('*** *** *** *** Encriptando password')
  var encript = pass + 'a1'
  // falta el algoritmo de algoritmo de encriptamiento
  cb(encript)
}
