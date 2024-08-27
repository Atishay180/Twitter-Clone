import express from "express"
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js"
import cookieParser from "cookie-parser"
import {v2 as cloudinary} from "cloudinary"

import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"

dotenv.config({
    path: `./backend/.env`
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())  //to parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }))  //to parse the form data(url encoded)

app.use(cookieParser()) //to parse the cookies

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectMongoDB();
})
