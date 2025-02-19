import express from "express"
import { Account } from "../Database/mongoDb.js"
import userMiddleware from "../middleware/userMiddleware.js";
import mongoose from "mongoose";


const router = express.Router();

//route to get the account balance
router.get("/balance", userMiddleware, async(req,res)=>{
    //get the account from database of the current user
    const account = await Account.findOne({
        userId: req.userId  //sent by userMiddleware
    })

    res.json({
        balance: account.balance
    })
})


//transfer money from one account to another
router.post("/transfer", userMiddleware, async(req,res)=>{
    //create a session first in mongodb, if anything goes wrong, roll back
    const session = await mongoose.startSession();

    //from here to the end of session, atomicity is preserved
    session.startTransaction();

    const amount = req.body.amount; //amount to send
    const to = req.body.to; //to whom send

    //fetch the account of the sender
    const senderAccount = await Account.findOne({
        userId: req.userId  //middleware put it
    }).session(session)
    

    //incase no account is found or insufficient fund is there
    if(!senderAccount || senderAccount.balance < amount)
    {
        await session.abortTransaction();   //end the session
        return res.status(400).json({
            message: "Insufficient balance / No sender account found!"
        })
    }

    let receiverAccount;
    //fetch the receiver account
    try{
        receiverAccount = await Account.findOne({
            userId: to
        }).session(session)
    }catch(error)
    {
        //incase of any error, abort the transaction
        await session.abortTransaction();
        return res.json({
            msg: "Invalid Receiver account!"
        })
    }
    
    //incase no receiver account is found
    if(!receiverAccount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message: "No receiver account found!"
        })
    }


    //now perform the transactions
    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    //commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successfully"
    })

})

export default router;