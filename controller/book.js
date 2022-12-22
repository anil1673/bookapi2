const Book = require("../models/Book");
const User = require("../models/user");



// add book
const addBookController=async(req,res,next)=>{
    try{
        const {name,faculty,fare}=req.body;
        if(!name || !faculty || !fare){
            res.json({
                message:"please fill all field"
            })
        }else{
            const newBook=new Book({
                name:name.toLowerCase(),faculty,fare,seller:req.params.sellerId
            });
           const book =await newBook.save();
           if(book){
            await User.findByIdAndUpdate(req.params.sellerId,{$push:{booktosell:{book:book}}});
            res.status(200).json({
                message:"book added successfully",
                book:book
            })
           }else{
            res.status(401).json({
                message:":omething went wrong"
            })
           }

        }
    }catch(error){
       next(error) 
    }
}


// get all book

const getAllBookController=async(req,res,next)=>{
    try{
        const book=await Book.find({available:true}).populate("seller");
        
        if(!book){
            res.status(200).json({
                message:"noo book available",
                book:[]
            })
        }else{
            res.status(200).json({
                book:book
            })
        }
    }catch(error){
        next(error)
    }
};

// filter book by faculty

const filterBookByFacultyController=async(req,res,next)=>{
    try{
      const {faculty}=req.query;
      const book=await Book.find({faculty,available:true}).populate("seller");
      if(!book){
        res.status(200).json({
            message:"noo book available",
            book:[]
        })
    }else{
        res.status(200).json({
            book:book
        })
    }
    }catch(error){
        next(error)
    }
}


// filter book by search

const filterBookBySearchController=async(req,res,next)=>{
    try{
      const {search}=req.body;
      const book=await Book.find({name:search.toLowerCase(),available:true}).populate("seller");
      if(!book){
        res.status(200).json({
            message:"noo book available",
            book:[]
        })
    }else{
        res.status(200).json({
            book:book
        })
    }
    }catch(error){
        next(error)
    }
}


// addToCart

const addBookToCartController=async(req,res,next)=>{
    try{
        const {carterId,bookId}=req.params;
        const book=await Book.findById({_id:bookId});
        

        if(book){
            await User.findByIdAndUpdate(carterId,{$push:{cart:{book:book}}});
            res.status(200).json({
                message:"book added to cart  successfully",
                book:book
            })
           }else{
            res.status(401).json({
                message:":something went wrong"
            })
           }

    }catch(error){
        next(error)
    }
}



// addToCart

const buyBookController=async(req,res,next)=>{
    try{
        const {buyerId,bookId}=req.params;
        const book=await Book.findById({_id:bookId});
        

        if(book){
            await User.findByIdAndUpdate(buyerId,{$pull:{cart:{book:book}}},{new:true});
            await User.findByIdAndUpdate(buyerId,{$push:{bookbought:{book:book}}},{new:true});
            await Book.findByIdAndUpdate(bookId,{$set:{available:false}});
            await User.findByIdAndUpdate(book.seller,{$pull:{booktosell:{book:bookId}}})

            
          
            res.status(200).json({
                message:"book bought  successfully",
                book:book
            })
           }else{
            res.status(401).json({
                message:":something went wrong"
            })
           }

    }catch(error){
        next(error)
    }
}

module.exports={
                addBookController,
                getAllBookController,
                filterBookByFacultyController,
                filterBookBySearchController,
                addBookToCartController,
                buyBookController
            }