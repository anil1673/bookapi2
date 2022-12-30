const mongoose=require("mongoose");

const esewaSchema=new mongoose.Schema({
    productId:{
        required:true,
        type:String
    },
    productId:{
        required:true,
        type:String
    },
    totalAmount:{
        required:true,
        type:String
    },
    environment:{
        required:true,
        type:String
    },
    code:{
        required:true,
        type:String
    },
    merchantName:{
        required:true,
        type:String
    },
    message:{
        type:{
            successMessage:{
                type:String,
                required:true
            },
            technicalSuccessMessage:{
                type:String,
                required:true
            }

        }
    },
    transactionDetails:{
        type:{
            status:{
                type:String,
                required:true
            },
            referenceId:{
                type:String,
                required:true
            },
            date:{
                type:Date,
                default:new Date()
            }

        }
    },
    
    


});


const Esewa=new mongoose.model("esewa",esewaSchema);

module.exports=Esewa;