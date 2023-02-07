import Role from "../models/role.js"
import User from "../models/user.js";
import { Category, Product } from "../models/index.js";

const isValidRole = (role = '') => {
    return Role.find({ role }).then(user => {
        if (user.length === 0) {
            return Promise.reject('Role invalid');
        }
        console.log(role);
    })
}

const emailExist = async(email = '') => {
    // verify if user already exist
    const userExist = await User.find({ email })
    if (userExist.length > 0) {
        return Promise.reject("User already exist")
    }
}

const userExistById = async(id)=>{
    const userExist = await User.findById(id)
    if (!userExist) {
        return Promise.reject("User not found")
    }
}

const categoryNotFound = async(id)=>{
    const category = await Category.findById(id)
    
    if(!category){
        return Promise.reject("category not found")
    }
}

const categoryExist = async(id,{req})=>{
    const {name = ""} = req.body
    const category = await Category.find({name: name.toUpperCase()})
    
    if(category.length > 0){
        return Promise.reject(`category ${category[0].name} already exist`)
    }
}

const duplicateProduct = async(id,{req})=>{
    const {name = ""} = req.body
    const products = await Product.find({name: name.toUpperCase()})
    if(products.length > 0){
        return Promise.reject(`product ${products[0].name} already exist`)
    }
}

const productNotFound = async(id)=>{
    const product = await Product.findById(id)
    if(!product || !product.state){
        return Promise.reject("product not found")
    }
}

const allowedCollections = ( collection = '', collections = [] ) =>{
    const included = collections.includes(collection)
    console.log(collection);
    if(!included){
        throw new Error(`${collection} is no allowed - ${collections}`)
    }
    return true
}
export { 
    isValidRole,
    emailExist,
    userExistById,
    categoryNotFound,
    categoryExist,
    duplicateProduct,
    productNotFound,
    allowedCollections  
}