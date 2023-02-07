import {Schema, model, SchemaTypes} from "mongoose"

const productSchema = new Schema({
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
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    description:{
        type:String
    },
    available:{
        type:Boolean,
        default:true
    },
    img:{
        type:String
    }
})

productSchema.methods.toJSON = function () {
    const { __v, state, ...category } = this.toObject()
    return { 
        ...category
    }
}

export default model('Product', productSchema)