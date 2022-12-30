const Esewa = require("../models/esewa");

const esewaPayment=async(req,res,next)=>{
    try{
        const {productId,productName,totalAmount,environment,code,merchantName,message,transactionDetails}=req.body;

        // const message.successfulMessage=req.body.
        

        const newConfirmation=new Esewa({
            productId,productName,totalAmount,environment,code,merchantName,message:{successMessage:message.successMessage,technicalSuccessMessage:message.technicalSuccessMessage},transactionDetails:{status:transactionDetails.status,referenceId:transactionDetails.referenceId,date:transactionDetails.date}
        });

        await newConfirmation.save().then(()=>{
            res.status(200).json(newConfirmation)
        }).catch((error)=>{
            res.status(400).json({
                message:error
                
            })
        })

        


    }catch(error){
        next(error)
    }
}

module.exports={esewaPayment};