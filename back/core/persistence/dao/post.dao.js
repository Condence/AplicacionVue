const postModel = require("../schemas/post.schema");
const tokenM = require("../../../middleware/middlewares");

module.exports.postPost = function(post){ 
    return new Promise((resolve, reject)=>{ 
        const postAGuardar = new postModel(post);     
        postAGuardar.save((error, result)=>{
            if(error){
                reject("Trono: " + error);
            }else{
                resolve(result);
            }
        });
    });
}
module.exports.getPosts = function(){ 
    return new Promise((resolve, reject) => {  
        postModel.find({public:true, activo:true},null,{sort: {createdAt: -1}}, (error, result)=>{
            if(error){
                reject("Trono: " + error);
            }else{
                resolve(result);
            }
        });
    });
} 
module.exports.getPostsID = function(postid){ 
    return new Promise((resolve, reject) => {  
        postModel.findById(postid, (error, result)=>{  
            if(result){ 
                if(result.activo){
                    if(error){
                        reject("Trono: " + error);
                    }else{
                        resolve(result);
                        /**
                        if(result.public){ 
                            resolve(result);
                        } else {
                            reject("Trono: post privado: " + error);
                        }
                        */
                    }
                } else {
                    reject("No se encontro el post");
                }
            } else {
                reject("No se encontro el post");
            }
             
        });
    });
} 
module.exports.getPostsUser = function(idUsuario){   
    return new Promise((resolve, reject) => { 
        if(respuesta.id == idUsuario){
            postModel.find({postedBy: idUsuario,activo:true}, (error, result)=>{
                if(error){
                    reject("Trono: " + error);
                }else{
                    resolve(result);
                }
            });
        } else {
            postModel.find({postedBy: idUsuario,public:true, activo: true}, (error, result)=>{
                if(error){
                    reject("Trono: " + error);
                }else{
                    resolve(result);
                }
            });
        } 
    });
} 
module.exports.getPostsFind = function(tags){
    return new Promise((resolve, reject) => {
        postModel.find({ tags: { $in: [tags] }, public:true}, (error, result)=>{
            if(error){
                reject("Trono: " + error);
            }else{
                resolve(result);
            }
        });
    });
} 
module.exports.deletePost = function(postid) {   
    return new Promise((resolve, reject) => { 
        postModel.findById(postid, (error, result)=>{
            if(error){
                reject("Trono: " + error);
            }else{ 
             
                    postModel.findByIdAndUpdate(postid,{activo: false}, (error, result)=>{ 
                        if(error){
                            reject("Trono: " + error);
                        }else{
                            resolve("Post eliminado");
                        }
                    }); 
            }
        });  
    });
} 
