import {Schema, model, SchemaTypes} from "mongoose"

const categorySchema = new Schema({
    name:{
        type:String,
        required:[true, "name is required"],
        unique:true
    },
    state:{
        type:Boolean,
        default:true,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

categorySchema.methods.toJSON = function () {
    const { __v, state, ...category } = this.toObject()
    return { 
        ...category
    }
}

export default model('Category', categorySchema)