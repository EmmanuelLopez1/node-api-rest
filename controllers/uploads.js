// NODE DEPENDENCIES
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'node:url';

// EXTERNAL DEPENDENCIES
import cloudinary from "cloudinary"
let cloudinaryv2 = cloudinary.v2

cloudinaryv2.config({
    secure:false,
})


// FILE VARS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HELPERS
import { uploadFile } from "../helpers/upload-file.js";

// MODELS
import { Product, User } from "../models/index.js";

const loadFile = async (req, res) => {
    try {
        const filePath = await uploadFile(req.files, ["jpg"], "mexa-mafia")
        res.json({
            name: filePath
        })
    } catch (err) {
        console.log(err);
        res.json(err)
    }

}

const updateImage = async (req, res) => {
    const { collection, id } = req.params
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `${id} not found`
                })
            }
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `${id} not found`
                })
            }
            break;
        default:
            return res.status(500).json({
                msg: `${collection} not found`
            })
    }


    try {
        if (model.img) {
            const pathImg = path.join(__dirname, "../uploads", collection, model.img)
            if (fs.existsSync(pathImg)) {
                fs.unlinkSync(pathImg)
            }
        }

        const filePath = await uploadFile(req.files, undefined, collection)
        model.img = filePath

        await model.save()

        res.status(200).json(model)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msj: "internal server error"
        })
    }
}

const updateImageCloudinary = async (req, res) => {
    const { collection, id } = req.params
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `${id} not found`
                })
            }
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `${id} not found`
                })
            }
            break;
        default:
            return res.status(500).json({
                msg: `${collection} not found`
            })
    }

    try {
        // clean images in cloudinary
        if (model.img) {
            const nombreArr = model.img.split('/')
            let name = nombreArr[ nombreArr.length - 1]
            const [ id ] = name.split('.')
            cloudinaryv2.uploader.destroy( id )
        }

        const { tempFilePath } = req.files.file
        const { secure_url } = await cloudinaryv2.uploader.upload( tempFilePath )
        
        model.img = secure_url
        await model.save()

        res.status(200).json( model )
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msj: "internal server error"
        })
    }
}

const showImage = async (req, res) => {
    const { collection, id } = req.params
    const notFoundPath = path.join(__dirname, '../assets/no-image.jpg')
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.sendFile(notFoundPath)

            }
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.sendFile(notFoundPath)
            }
            break;
        default:
            return res.status(500).json({
                msg: `${collection} not found`
            })
    }


    try {
        if (model.img) {
            const pathImg = path.join(__dirname, "../uploads", collection, model.img)
            if (fs.existsSync(pathImg)) {
                return res.sendFile(pathImg)
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msj: "internal server error"
        })
    }
}

export {
    loadFile,
    showImage,
    updateImage,
    updateImageCloudinary
}