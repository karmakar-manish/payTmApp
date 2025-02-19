import express from "express"
import jwt from "jsonwebtoken"
import { User, Account } from "../Database/mongoDb.js"
import JWT_SECRET from "../config.js"
import zod from "zod"
import userMiddleware from "../middleware/userMiddleware.js";

const router = express.Router();

//the sign up schema of user
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

router.post("/signup", async(req,res)=>{
    const body = req.body;
    const response = signupSchema.safeParse(body)   //zod validation

    //incase of no success
    if(!response.success)
    {
        return res.status(411).json({
            msg: "Incorrect input"
        })
    }
    //check if any user with the same username is present or not
    const user = await User.findOne({
        username : body.username
    })
    if(user)
    {
        res.status(411).json({
            msg:"Username already exists!"
        })
    }
    else
    {
        //incase every thing is correct, insert data in database
        const dbUser = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            password: body.password
        })
        
        //for every user, there will be a bank account in bank schema
        //with random balance
        await Account.create({
            userId: dbUser._id,    //reference key
            balance: 1 + Math.random() * 10000
        })

       
        //create jwt token of the _id of the user
        const token = jwt.sign({userId:dbUser._id}, JWT_SECRET)

        res.json({
            message: "User created successfully",
            token: token
        })
    }

})

//signin body schema
const signinSchema = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1)
})

router.post("/signin", async(req,res)=>{
    const response = signinSchema.safeParse(req.body);
    //incase of no success
    if(!response.success)
    {
        return res.status(411).json({
            msg: "Invalid Username/Password"
        })
    }

    //find the user from the database
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    //incase user is found
    if(user)
    {
        //create a jwt token and return it
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        return res.json({
            token: token
        })
    }
    //incase user is not found
    res.status(411).json({
        message: "No user found!"
    })
})


//update schema for zod validation
const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})


//allow users to optimally update the password, firsName or lastname
router.put("/", userMiddleware, async(req,res)=>{
    const response = updateBody.safeParse(req.body)
    //incase of error
    if(!response.success)
    {
        res.status(411).json({
            msg: "Error while updating information"
        })
    }
    else{
        //update in database
        await User.updateOne(req.body, {
            _id: req.userId //sent by the middleware in req
        })

        req.json({
            msg: "Updated successfully!"
        })
    }
})


//route to get a list of users starting with the name given in query parameter
router.get("/bulk", async (req,res)=>{

    //get the filter from query parameter
    const filter = req.query.filter || ""

    //returns if either of the two is true for the given filter
    const users = await User.find({
        $or: [{ //match a substring in mongoose
                firstName: { "$regex": filter}
            }, {
                lastName: { "$regex": filter}
            }]
        })
    
    //return all the user details from the database
    res.json({
        user: users.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


//route to get the firstname and lastname of the user given the user_id
router.get("/getuser", userMiddleware, async(req,res)=>{
    //get the userId from the userMiddleware
    const id = req.userId

    const account = await User.findOne({
        _id : req.userId
    })

    //incase no user found
    if(!account)
    {
        return res.status(400).json({
            message: "No account found"
        })
    }

    res.json({
        firstName: account.firstName,
        lastName: account.lastName
    })
})

export default router;