const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart:{
        type:[
            {
                book:{type:mongoose.Schema.Types.ObjectId,ref:"Book"},
                timeStamp:{
                    type:Date,
                    default:new Date()

                }
            }
            
        ]
    },
    booktosell:{
        type:[
            {
                book:{type:mongoose.Schema.Types.ObjectId,ref:"Book"},
                timeStamp:{
                    type:Date,
                    default:new Date()

                }
            }
            
        ]
    },
    bookbought:{
        type:[
            {
                book:{type:mongoose.Schema.Types.ObjectId,ref:"Book"},
                timeStamp:{
                    type:Date,
                    default:new Date()
                }
            }
            
        ] 
    }

},{timestamps:true})

const User=new mongoose.model("User",userSchema);

module.exports=User;