const express=require("express");
const userRouter=express.Router();
const {verifyUserController}=require("../controller/user");
const verifyUser =require("../middleware/authenticate"); 

userRouter.get("/verifyUser",verifyUser,verifyUserController)


module.exports=userRouter;