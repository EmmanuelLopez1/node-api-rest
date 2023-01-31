import bcryptjs from "bcryptjs"

// MODELS
import User from "../models/user.js";

// HELPERS
import { generateJTW } from "../helpers/generateJWT.js";
import { googleVerify } from "../helpers/google-verify.js";

const logIn = async(req, res)=>{
    const { email, password } = req.body

    // Verify user exist
    const user = await User.findOne({ email })
    if(!user){
        return res.status(400).json({
            msg:"User / Password incorrect"
        })
    }
    // Verify if user is active
    if(!user.state){
        return res.status(400).json({
            msg:"User / Password incorrect state:false"
        })
    }

    // Verify password
    const validPassword = bcryptjs.compareSync( password, user.password )
    if(!validPassword){
        return res.status(400).json({
            msg:"User / Password incorrect state:false password"
        })
    }

    // Generate JWT
    const token = await generateJTW( user.id )

    try {
        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Something went bad"
        })
    }
}

const googleSignIn = async(req, res, next)=>{
    const {id_token} = req.body
    
    try{
        const {name, picture, email} = await googleVerify(id_token)

        let user = await User.findOne({ email})

        if(!user){
            const data = {
                name,
                email,
                password:":)",
                picture,
                google:true,
                role:"USER_ROLE"
            }

            user = new User( data )
            await user.save()
        }

        if(!user.state){
            return res.status(401).json({
                msg:"user disabled"
            })
        }

        const token = await generateJTW( user.id )


        res.json({
            user,
            token
        })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            ok:false,
            msg:"Error unknowed"
        })
    }
}

export {
    logIn,
    googleSignIn
}