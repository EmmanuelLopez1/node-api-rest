import { Product } from "../models/index.js";


const getProducts = async (req, res) => {
    const { max = 5, from = 0 } = req.query
    const query = { state: true }

    const [count, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(Number(from))
            .limit(Number(max))
            .populate("user")
            .populate("category")
    ])
    res.json({
        count,
        products
    })
}

const getProduct = async(req, res) => {
    const {id} = req.params

    const product = await Product.findById(id)
        .populate({path:"user", select:["_id", "name", "email", "role"]})
        .populate({path:"category", select:["_id", "name", "user"]})

    res.status(200).json(product)
}

const createProduct = async (req, res) => {
    let {state, user, ...data} = req.body

    data.name = data.name.toUpperCase()
    data = {
        user:req.uid,
        ...data
    }
    
    console.log(data);

    const product = await new Product(data)
    await product.save()

    return res.status(201).json(data)
}

const updateProduct = async(req, res) => {
    const { id } = req.params
    const { state, ...data } = req.body

    data.name = data.name.toUpperCase()

    // store last user that modified the category
    data.user = req.uid

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {new:true})
        .populate({path:"user", select:["_id", "name", "email", "role"]})
        .populate({path:"category", select:["_id", "name", "user"]})

    res.json({
        updatedProduct
    })
}

const deleteProduct = async(req, res) => {
    const {id} = req.params
    let product = await Product.findOneAndUpdate(id, {state:false}, {new:true})
        .populate({path:"user", select:["_id", "name", "email", "role"]})
        .populate({path:"category", select:["_id", "name", "user"]})

    res.status(200).json(product)
}

export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
