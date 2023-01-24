import { validationResult } from "express-validator"

const verifyFields = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400)
        return res.json(errors)
    }
    next()
}

export {
    verifyFields
}