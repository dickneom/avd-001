// /control/messages.js

var db = require('../models/db')

module.exports.messageInsert = function messageInsert (mess, cb) {
  db.Message.create(mess).then(function (message) {
    cb(null, message)
  }).catch(function (errors) {
    cb(errors)
  })
}
