// PACKAGES
import dotenv from "dotenv"
// OUR IMPORTS
import Server from "./models/server.js"

// CONFIG
dotenv.config()

const server = new Server()
server.listen()