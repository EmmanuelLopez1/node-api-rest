// DEPENDENCIES
import { Router } from "express";
import { check, body, param } from "express-validator";

// CONTROLLERS
import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} from "../controllers/products.js";


// VALIDATORS 
import {
    duplicateProduct,
    productNotFound,
    categoryNotFound,
    userExistById
} from "../helpers/db-validators.js";

// MIDDLEWARES
import { verifyFields } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { isAdminRole } from "../middlewares/validate-roles.js";

const router = Router()

router.get("/", getProducts)

router.get("/:id",
    [
        param("id").custom(productNotFound),
        param("id", "id is required").not().isEmpty(),
        check("id", "id is not a mongo Id").isMongoId(),
        verifyFields
    ],
    getProduct)

router.post("/",
    [
        validateJWT,
        check("name").custom( duplicateProduct ),
        body("name", "name is required").not().isEmpty(),
        body("user", "user must to be a mongoId").isMongoId(),
        body("user", "user is required").not().isEmpty(),
        check("user").custom( userExistById ),
        body("category", "category must to be a mongoId").isMongoId(),
        body("category", "category is required").not().isEmpty(),
        check("category").custom(categoryNotFound),
        verifyFields
    ], createProduct)

router.put("/:id",
    [
        validateJWT,
        check("name").custom(duplicateProduct),
        body("name", "name is required").not().isEmpty(),
        body("user", "user must to be a mongoId").isMongoId(),
        body("user", "user is required").not().isEmpty(),
        check("user").custom(userExistById),
        param("id", "id is required").not().isEmpty(),
        check("id", "id is not a mongo Id").isMongoId(),
        body("category", "category must to be a mongoId").isMongoId(),
        check("category").custom(categoryNotFound),
        verifyFields
    ],
    updateProduct)

router.delete("/:id",
    [
        validateJWT,
        isAdminRole,
        check("id").custom(productNotFound),
        param("id", "id is required").not().isEmpty(),
        check("id", "id is not a mongo Id").isMongoId(),
        verifyFields
    ],
    deleteProduct)


export default router