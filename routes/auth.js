import { Router } from "express"
import { check } from "express-validator"

// CONTROLLERS
import { logIn, googleSignIn } from "../controllers/auth.js"

// MIDDLEWARES
import { verifyFields  } from "../middlewares/validate-fields.js"

const router = Router()

router.post('/login',
[
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    verifyFields
], logIn)

router.post('/google',
[
    check("id_token", "google token is required").not().isEmpty(),
    verifyFields
], googleSignIn)


export default router