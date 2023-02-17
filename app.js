// PACKAGES
import * as dotenv from 'dotenv'
// CONFIG
dotenv.config()

// OUR IMPORTS
import Server from "./models/server.js"


const server = new Server()
server.listen()