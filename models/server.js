// DEPENDENCIES
import express from 'express'
import cors from "cors"
import fileUpload from 'express-fileupload'


// routes
import user_router from "../routes/user.js"
import auth_router from "../routes/auth.js"
import categories_router from "../routes/categories.js"
import products_router from "../routes/products.js"
import find_router from "../routes/find.js"
import uploads_router from "../routes/uploads.js"

// db connection
import { dbConnection } from '../database/config.js'

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        // PATHS
        const api_base_url = "/api"
        this.paths = {
            user: `${api_base_url}/users`,
            auth:`${api_base_url}/auth`,
            categories:`${api_base_url}/categories`,
            products:`${api_base_url}/products`,
            find:`${api_base_url}/find`,
            uploads:`${api_base_url}/uploads`
        }
        
        // db connection
        this.dbConnection()

        // middlewares
        this.middlewares()

        // routes
        this.routes()
    }

    async dbConnection() {
        await dbConnection()
    }

    routes() {
        const {
            user, 
            auth, 
            categories, 
            products, 
            find, 
            uploads} = this.paths

        this.app.use(user, user_router)
        this.app.use(auth, auth_router)
        this.app.use(categories, categories_router)
        this.app.use(products, products_router)
        this.app.use(find, find_router)
        this.app.use(uploads, uploads_router)
    }

    middlewares() {
        this.app.use(express.static("public"))

        this.app.use(express.json())
        this.app.use(cors())

        // load files
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("app running on port ", this.port);
        })

    }
}


export default Server