import { isObjectIdOrHexString } from "mongoose"
import { Category, Product, User } from "../models/index.js"

const collectionsAllowed = [
    'users',
    'categories',
    'products',
    'roles'
]

const findUsers = async(termino = '', res)=>{
    const isMongoId = isObjectIdOrHexString(termino)

    if(isMongoId){
        const user = await User.findById(termino)
        return res.json({
            results: (user) ? user : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const users = await User.find( {
        $or:[{name:regex}, {email:regex}],
        state:true
    })
    res.json({
        results:users
    })
}

const findCategories = async(termino = '', res)=>{
    const isMongoId = isObjectIdOrHexString(termino)

    if(isMongoId){
        const category = await Category.findById(termino)
        return res.json({
            results: (category) ? category : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const category = await Category.find( {name:regex, state:true})
    res.json({
        results:category
    })
}

const findProducts = async(termino = '', res)=>{
    const isMongoId = isObjectIdOrHexString(termino)

    if(isMongoId){
        const product = await Product.findById(termino)
        return res.json({
            results: (product) ? product : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const product = await Product.find( {name:regex, state:true})
    res.json({
        results:product
    })
}

const find = async(req, res)=>{
    const {collection, termino} = req.params

    if(!collectionsAllowed.includes(collection)){
        return res.status(400).json({
            msg:`category ${collection} not found`
        })
    }

    switch (collection) {
        case 'users':
            await findUsers(termino, res)
            break;
        case 'categories':
            findCategories(termino, res)
            break;
        case 'products':
            findProducts(termino, res)
            break;
        default:
            res.status(500).json({
                msg:"this route is not supported"
            })
            break;
    }
}

export {
    find
}