const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    faculty:{
        type:[],
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    },
    available:{
        type:Boolean,
        default:true

    }
},{
    timestamps:true
});

const Book=new mongoose.model("Book",bookSchema);

module.exports=Book;