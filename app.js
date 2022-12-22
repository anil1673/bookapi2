const dotenv=require("dotenv");
dotenv.config({path:"./config.env"});
const express=require("express");
const app=express();
const userRouter=require("./router/user")
const cors=require("cors")
const cookieParser=require("cookie-parser");
const authRouter = require("./router/auth");
const bookRouter = require("./router/book");
require("./db/conn.js")



app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/book",bookRouter)

app.use((err,req,res,next)=>{
    errorStatus=err.status||500;
    errorMessage=err.message||"something went wrong";

    return res.status(errorStatus).json({
        status:errorStatus,
        stack:err.stack,
        message:errorMessage,
        success:false
    })

})

app.listen(process.env.PORT,(req,res)=>{
    console.log("express connection success")
})