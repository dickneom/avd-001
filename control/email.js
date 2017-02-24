/**
/ Encripta un mensaje
*/
function encryptEmail (message) {
  console.log('(EMAIL.JS) *** *** *** *** Encriptando mensaje de email')
  message = message + ';a1'
  return message
}

/**
/ Desencripta el mensaje encriptado con la funcion anterior
*/
function decryptEmail (message) {
  console.log('(EMAIL.JS) *** *** *** *** Desencriptando mensaje de email')
  message = message.split(';')[0]
  return message
}

/**
/ Envia un email, dato el email destino y el mensaje a enviar
/ El remitente es el correo del sistema
*/
function sendSystemEmail (email, subject, message) {
  console.log('(EMAIL.JS) *** *** *** *** Email enviado a: ' + email + ' mensaje: ' + message)
}

module.exports.encryptEmail = encryptEmail
module.exports.decryptEmail = decryptEmail
module.exports.sendSystemEmail = sendSystemEmail
