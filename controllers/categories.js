import bcrypt from "bcryptjs"
import { json } from "express";
import { Category } from "../models/index.js"

const getCategories = async (req, res) => {
    const { max = 5, from = 0 } = req.query
    const query = { state: true }

    const [count, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(from))
            .limit(Number(max))
            .populate("user")
    ])
    res.json({
        count,
        categories
    })
}

const getCategory = async(req, res) => {
    const {id} = req.params

    const category = await Category.findById(id)
        .populate("user")

    res.json(category)
}

const createCategory = async (req, res) => {
    const name = req.body.name.toUpperCase()

    const data = {
        name,
        user: req.uid
    }

    const category = await new Category(data)
    await category.save()

    res.status(201).json(category)
}

const updateCategory = async(req, res) => {
    const { id } = req.params
    const {state, user, ...data} = req.body

    data.name = data.name.toUpperCase()

    // store last user that modified the category
    data.user = req.uid

    const updatedCategory = await Category.findByIdAndUpdate(id, data, {new:true})
        .populate("user")

    res.json({
        updatedCategory
    })
}

const deleteCategory = async(req, res) => {
    const {id} = req.params
    let category = await Category.findOneAndUpdate(id, {state:false}, {new:true})
        .populate("user")
    res.json(category)
}

export {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
