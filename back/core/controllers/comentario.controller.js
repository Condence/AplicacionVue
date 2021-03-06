const comentarioDao = require("../persistence/dao/comentario.dao");

module.exports = { 
    postComment(req, res){
        let postid = req.params.postid;   
        let comment = req.body.comentario;
        let usuario_id = req.body.postedBy; 
        let p_postedByName = req.body.postedByName;
        
        comentarioDao.postComment(postid,comment,p_postedByName, usuario_id).then((result)=>{
            res.status(200).json(result);
        }).catch((error)=>{
            res.status(500).json(error);
        });        
    },
    deleteComment(req, res) {    
        let commentid = req.params.commentid; 
        let postid = req.body.postid; 
        try{
            comentarioDao.deleteComment(commentid, postid).then((result)=>{
                res.status(200).json(result);
            }).catch((error)=>{
                res.status(500).json(error);
            });  
        }catch(error){
            res.status(500).json(error);
        }                     
    },
};