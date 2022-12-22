const verifyUserController=(req,res,next)=>{    
    try{
            res.json({
                isLoggedIn:true,user:req.user
            })
    }catch(error){
        next(error)
    }
}

module.exports={verifyUserController}