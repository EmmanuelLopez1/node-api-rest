import Role from "../models/role.js"
import User from "../models/user.js";

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

export { 
    isValidRole,
    emailExist,
    userExistById
}