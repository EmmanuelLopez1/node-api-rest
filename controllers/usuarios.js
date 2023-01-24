import { response } from "express"
import bcrypt from "bcryptjs"
import User from "../models/user.js"

const getUsers = async(req, res = response)=> {
    const { max = 5, from = 0} = req.query
    const query = {state:true}

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(max))
    ])
    res.json({
        total,
        users
    })
}

const createUser = async(req, res = response)=> {  
    try {
        const {name, email, password, role} = req.body  
        
        // create new user
        const user = new User({name, email, role})
        
        // generate a salt
        const salt = bcrypt.genSaltSync(10)
        
        // set hashed password in user
        user.password = bcrypt.hashSync(password, salt)
        
        // save user in database
        await user.save()

        // return message
        return res.json(user)
        
    } catch (error) {
        console.log(error)
        throw new Error("ocurrio un error en la db.")
    }
}

const replaceUser = (req, res = response)=> {
    res.json({
        msg:"put API - controlador",
        ...req.body 
    })

}

const updateUser = async(req, res = response)=> {
    const { id } = req.params
    const { _id, password, google, email, ...remaining } = req.body;

    console.log(remaining);

    if(password){
        const salt = bcrypt.genSaltSync(10)
        remaining.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate( id, remaining)

    res.json(user)

}

const deleteUser = async(req, res = response)=> {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, {state:false})

    res.json(user)
}

export {
    getUsers,
    createUser, 
    replaceUser,
    updateUser,
    deleteUser
}
