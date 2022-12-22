const User = require("../models/user");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const e = require("express");
const { transporter } = require("../email/emailConfig");

const registerUser=async(req,res,next)=>{
    try{
        const {name,email,password,phone,gender}=req.body;
        const checkName=await User.findOne({name});
        const checkEmail=await User.findOne({email});

        if(checkEmail || checkName){
            res.json({message:"username or email is alreday being used"})
        }else{
            const hashPass=await bcryptjs.hash(password,10);

            const newUser=new User({
                name,email,phone,password:hashPass,gender
            });
            await newUser.save();
            res.status(200).json(newUser);
        }
    }catch(error){
        next(error)
    }
}


const loginUser=async(req,res,next)=>{
    try{
        const {email,password} =req.body;

        const user=await User.findOne({email}).then((dbuser)=>{
            if(!dbuser){
                res.json({message:"Email you enter is invalid"})

            }else{
               bcryptjs.compare(password,dbuser.password).then((isCorrect)=>{
                if(isCorrect){
                    
                    jwt.sign({_id:dbuser._id},process.env.SECRET_KEY,(err,token)=>{
                        if(err) {
                            return res.json({message:err})
                        }else{
                            return res.json({
                                message:"login success",
                                token: "Bearer "+token,
                                user:dbuser
                            })
                        }
                    })
                }else{
                    res.json({message:"password is incorrect"})
                }
                

               })
            }
        })

        
    }catch(error){

    }
}


const changePassword=async(req,res,next)=>{
    const {oldPassword,password,confirmPassword}=req.body;
    try{
        if(!password || !confirmPassword || !oldPassword){
            res.json({
                message:"fill all field"
            })
        }else if(password!=confirmPassword){
            res.json({
                message:"password mismatch"
            })
        }else{
            const user=await User.findById(req.params.id);
            if(!user){
                res.json({
                    message:"user not found"
                })
            }else{
                if(await bcryptjs.compare(oldPassword,user.password)){
                    const hashPass= await bcryptjs.hash(password,10)
                    const findUser=await User.findByIdAndUpdate(req.params.id,{$set:{password:hashPass}})
                    if(findUser){
                        console.log(findUser)
                        res.status(200).json({
                            message:"password changed successfully"
                        })
                    }else{
                        res.status(200).json({
                            message:"password changed failed"
                        })
                    }

                }else{
                    res.json({
                        message:"old password is wrong"
                    })
                }
            }  
           
        }
    }catch(error){
        next(error)
    }
}

// forget password link generator


const forgetPasswordLinkGenerator=async(req,res,next)=>{
    try{
        const email=req.body.email;

        const checkEmail=await User.findOne({email});

        if(!checkEmail) {
            res.status(404).json({
                message:"invalid email"
            })
        }else{
            const secret_key=checkEmail._id+process.env.SECRET_KEY
            const token=jwt.sign({_id:checkEmail._id},secret_key,{
                expiresIn:"15m"
            });
            const link=`http://localhost:5000/api/auth/resetPassword/${checkEmail._id}/${token}`;
            
            // setting gamil password link
            let info=await transporter.sendMail({
                from:process.env.EMAIL_FROM,
                to:checkEmail.email,
                subject:"Authentication for Forget Password",
                html:`<a href=${link}>Click here </a> to Reset your Password`
            })

            res.status(200).json({
                message:"check your email to change password"
            })
        }

    }catch(error){
        next(error)
    }

}


// forget password change password 
const forgetPasswordChange=async(req,res,next)=>{
    try{
        const {id,token}=req.params;
        const {password,confirmPassword}=req.body;

        const user=await User.findById(id);
        const secret_key=user._id + process.env.SECRET_KEY;
        if(jwt.verify(token,secret_key)){
            if(!password || !confirmPassword){
                res.json({
                    message:"fill all field"
                })
            }else if(password!=confirmPassword){
                res.json({
                    message:"password mismatch"
                })
            }else{
                const hashPass= await bcryptjs.hash(password,10)
                const findUser=await User.findByIdAndUpdate(req.params.id,{$set:{password:hashPass}});
                res.status(200).json({
                    message:"password reset successfull"
                })
            }
        }else{
            res.status(404).json({
                message:"invlaid token"
            })
        }
    }catch(error){
        next(error)
    }
}

module.exports={registerUser,loginUser,changePassword,forgetPasswordLinkGenerator,forgetPasswordChange}