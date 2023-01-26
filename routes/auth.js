import { Router } from "express"
import { check } from "express-validator"

// CONTROLLERS
import { logIn } from "../controllers/auth.js"

// MIDDLEWARES
import { verifyFields  } from "../middlewares/validate-fields.js"

const router = Router()

router.post('/login',
[
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    verifyFields
], logIn)

export default router