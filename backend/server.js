import express from "express"
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"

dotenv.config({
    path: `./backend/.env`
})

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())  //to parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }))  //to parse the form data(url encoded)

app.use(cookieParser()) //to parse the cookies

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectMongoDB();
})
