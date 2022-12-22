const dotenv=require("dotenv");
dotenv.config({path:"./config.env"});
const mongoose=require("mongoose");
const DB=process.env.DATABASE;

mongoose.set('strictQuery', true);
mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("mongoose connection success")
}).catch((error)=>{
    console.log("mongoose connection problem")
})
