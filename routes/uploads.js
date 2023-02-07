import { Router } from "express"
import { check } from "express-validator"

// CONTROLLERS
import { 
    loadFile, 
    updateImage, 
    showImage,
    updateImageCloudinary
} from "../controllers/uploads.js"

// MIDDLEWARES
import { verifyFields } from "../middlewares/validate-fields.js"
import { validateFile } from "../middlewares/validate-file.js"


// HELPERS
import { allowedCollections } from "../helpers/db-validators.js"

const router = Router()

router.post("/",
    [
        validateFile
    ],
    loadFile)

router.put("/:collection/:id",
    [
        check("id", "id is not a mongoId").isMongoId(),
        check("collection").custom(c => allowedCollections(c, ['users', 'products'])),
        validateFile,
        verifyFields
    ],
    updateImageCloudinary)

router.get("/:collection/:id",
    [
        check("id", "id is not a mongoId").isMongoId(),
        check("collection").custom(c => allowedCollections(c, ['users', 'products'])),
        verifyFields
    ],
    showImage)

export default router