import { Router } from "express"
import { check } from "express-validator"
import { getUsers,
        createUser,
        updateUser,
        replaceUser,
        deleteUser } from "../controllers/usuarios.js"

import { 
        isValidRole,
        emailExist,
        userExistById
} from "../helpers/db-validators.js"

import {
        verifyFields,
        validateJWT,
        verifyRole
} from "../middlewares/index.js"

const router = Router()

router.get('/', getUsers)
router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Min length password is 6 characteres').isLength({min:6}),
        check('email', 'Invalid email').isEmail(),
        check('role').custom(isValidRole),
        check('email').custom(emailExist),
        verifyFields
],createUser)

router.put('/:id',[

], replaceUser)

router.patch('/:id',[
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( userExistById ),
        check('role').custom(isValidRole),
        verifyFields
], updateUser)

router.delete('/:id',[
        validateJWT,
        // isAdminRole,
        verifyRole(["ADMIN_ROLE", "VENTAS_ROLE"]),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( userExistById ),
        verifyFields,
], deleteUser)



export default router