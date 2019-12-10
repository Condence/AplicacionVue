const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
//const generosEnum = require("../enums/generosEnum");
const ObjectId = mongoose.Types.ObjectId;
const uniqueValidator = require('mongoose-unique-validator');
 
 
const UsuarioSchema = new Schema({
    nombre:{type:String, required:true, maxlenght:50},
    password:{type:String, required:true, maxlenght:150},
    correo:{type:String, required:true, maxlenght:50},
    fechaNacimiento:{type:String},      
    genero:{type: String, required:true, maxlenght:50},
    activo:{type: Boolean, default:true},
    rol:{type: String},
    posts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Posts' 
    }],
    conocidos: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario'
    }]
}, { timestamps: true });  


UsuarioSchema.plugin(uniqueValidator, { message: 'ya se encuentra registrado' });
module.exports = mongoose.model("Usuario", UsuarioSchema, "usuario");