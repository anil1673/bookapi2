const express=require("express");
const bookRouter=express.Router();
const {
    addBookController,
    getAllBookController,
    filterBookByFacultyController,
    filterBookBySearchController,
    addBookToCartController,
    buyBookController,
    }=require("../controller/book");
const verifyUser =require("../middleware/authenticate"); 

bookRouter.post("/addBook/:sellerId",verifyUser,addBookController);
bookRouter.get("/getAllBook",verifyUser,getAllBookController);
bookRouter.get("/filterBookByFaculty",verifyUser,filterBookByFacultyController);
bookRouter.get("/filterBookBySearch",verifyUser,filterBookBySearchController);
bookRouter.put("/addBookToCart/:carterId/:bookId",verifyUser,addBookToCartController);
bookRouter.put("/buyBook/:buyerId/:bookId",verifyUser,buyBookController);



module.exports=bookRouter;