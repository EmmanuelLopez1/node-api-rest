import {Router}  from "express"

// CONTROLLERS
import { find } from "../controllers/find.js";

const router = Router()

router.get("/:collection/:termino", find)


export default router