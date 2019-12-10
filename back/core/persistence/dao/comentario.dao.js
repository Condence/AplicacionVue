const comentarioModel = require("../schemas/comentario.schema");
const postModel = require("../schemas/post.schema");
const tokenM = require("../../../middleware/middlewares");

module.exports.postComment = function(post_id,comment, p_postedByName, usuario_id){ 
    return new Promise((resolve, reject)=>{ 
        //{$push: {asistencias: Date.now}} 
        postModel.findOneAndUpdate({_id: post_id}, {$push: {comentarios: {content: comment, postedByName: p_postedByName,postedBy: usuario_id}}}, (error, result)=>{ 
            if(error){
                reject("Trono: " + error);
                console.log(error);
            }else{ 
                resolve(result);
            }
        }); 
    });
}