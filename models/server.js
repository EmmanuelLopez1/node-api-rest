import express, { json } from 'express'
import cors from "cors"

// routes
import user_router from "../routes/user.js"
import auth_router from "../routes/auth.js"

// db connection
import { dbConnection } from '../database/config.js'

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = "/api/users"
        this.authPath = "/api/auth"


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
        this.app.use(this.usersPath, user_router)
        this.app.use(this.authPath, auth_router)
    }

    middlewares() {
        this.app.use(express.static("public"))

        this.app.use(express.json())
        this.app.use(cors())
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("app running on port ", this.port);
        })

    }
}


export default Server