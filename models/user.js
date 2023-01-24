import {Schema, model} from "mongoose"

const userSchema = new Schema({
    name:{
        type:String,
        required:[true, "email is required"]
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    img:{
        type:String
    },
    role:{
        type:String,
        required:[true, "role is required"],
        enum:['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    state:{
        type: Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})

userSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject()
    return user
}

export default model('User', userSchema)