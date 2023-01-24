import {Schema, model} from "mongoose"

const roleSchema = new Schema({
    role:{
        type:String,
        required:[true, "role is required"]
    }
})

export default model('Role', roleSchema)