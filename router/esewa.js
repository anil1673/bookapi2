const express=require("express");
const esewaRouter=express.Router();
const {esewaPayment} =require("../controller/esewa")

// esewaRouter.post("/register",registerUser);
esewaRouter.post("/payment/confirmation",esewaPayment)

module.exports=esewaRouter;