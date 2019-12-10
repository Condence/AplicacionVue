const jwt = require("jsonwebtoken"); 
const config = require("../config"); 
 
exports.generateToken = function(user,nombrer,rol,email){
    return jwt.sign({_id:user, nombre:nombrer, rol:rol, correo: email}, config.auth.secret);
}
 
exports.validateToken = async function(token) { 
    global.respuesta = await jwt.verify(token, config.auth.secret); 
    return respuesta; 
}