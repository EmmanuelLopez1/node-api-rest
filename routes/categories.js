import { Router } from "express"
import { check } from "express-validator"

// CONTROLLERS
import {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categories.js"

// MIDDLEWARES
import { verifyFields } from "../middlewares/validate-fields.js"
import { validateJWT } from "../middlewares/validate-jwt.js"

// DB 
import { categoryNotFound, categoryExist } from "../helpers/db-validators.js"
import { isAdminRole } from "../middlewares/validate-roles.js"

const router = Router()

// get all categories - public
router.get("/", getCategories)

// get a category by id - public
router.get("/:id",
    [
        check("id", "id isnt a mongo Id").isMongoId(),
        check("id").custom( categoryNotFound ),
        verifyFields
    ],
    getCategory)

// create a category - private - any person with a valid token
router.post("/",
    [
        validateJWT,
        check('name', 'name is required').not().isEmpty(),
        check("id").custom( categoryExist ),
        verifyFields
    ],
    createCategory)

// update a category - private - any person with a valid token
router.put("/:id",
    [
        validateJWT,
        check("id", "id isnt a mongo Id").isMongoId(),
        check("name", "name is required").not().isEmpty(),
        check("id").custom( categoryExist ),
        verifyFields
    ],
    updateCategory)

// delete a category - private - Admin
router.delete("/:id", 
[
    validateJWT,
    isAdminRole,
    check("id", "id isnt a mongo Id").isMongoId(),
    check("id").custom( categoryNotFound ),
    verifyFields
],
deleteCategory)


export default router