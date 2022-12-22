const jwt= require("jsonwebtoken");

const verifyUser=async(req,res,next)=>{
     const token=req.headers.authorization?.split(" ")[1];
     console.log(req.headers.authorization)
    //  token are stored in some area like localstorage or session storage and then send it in  header to verify

    if(token){
        jwt.verify(token,process.env.SECRET_KEY,(err,decodedUser)=>{
            if(err){
                return res.json({
                    message:"Authorization error",
                    isLoggedIn:false
                })
            }else{
                console.log(decodedUser)
                req.user=decodedUser
            }
            next();
        })
        
    }else{
        return res.json({
            message:"Authentication error"
        })
    }
}

module.exports=verifyUser