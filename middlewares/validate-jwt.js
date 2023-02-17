import jwt from "jsonwebtoken"
import User from "../models/user.js"

const validateJWT = async(req, res, next)=>{
    const token = req.header('x-token')

    if(!token){
        return res.json({
            msg:"Any token found :("
        })
    }

    try {
        // verify is a valid token and get uid
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY)

        // verify token corresponde to one user id db
        const user = await User.findById(uid)
        if(!user){
            return res.status(401).json({
                msg:"Invalid token - user non-exist in DB"
            })
        }

        // verify user is active
        if( !user.state ){
            return res.status(401).json({
                msg:"Invalid token - user with state in false"
            })
        }

        req.uid = uid
        req.authenticatedUser = user

        next()
    } catch (err) {
        res.status(401).json({
            msg:"Invalid Token"
        })
    }
}

export{
    validateJWT
}