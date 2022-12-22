const express=require("express");
const authRouter=express.Router();
const {registerUser,loginUser,changePassword,forgetPasswordLinkGenerator,forgetPasswordChange}=require("../controller/auth");
const verifyUser = require("../middleware/authenticate");

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
authRouter.put("/changePassword/:id",verifyUser,changePassword);
authRouter.post("/forgetPassword",forgetPasswordLinkGenerator);
authRouter.put("/resetPassword/:id/:token",forgetPasswordChange);

module.exports=authRouter;