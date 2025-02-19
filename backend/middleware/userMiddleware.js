import JWT_SECRET from "../config.js"
import jwt from "jsonwebtoken"

function userMiddleware(req,res,next){
    //get the authorization header
    const authHeader = req.headers.authorization
    
    //incase of no authHeader is there or it doesn't start with "Bearer "
    if(!authHeader || !authHeader.startsWith('Bearer '))
    {
        return res.status(403).json({
            msg: "Authorization failed!"
        })
    }

    //get only the token
    const token = authHeader.split(' ')[1];
    try{
        //verify the jwt token
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId     //put the userId in req
        next()

    }catch(err){
        return res.status(403).json({
            msg: "Cannot verify the jwt token!"
        })
    }
}

export default userMiddleware