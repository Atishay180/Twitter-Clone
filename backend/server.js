import express from "express"
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js"

import authRoutes from "./routes/auth.routes.js"

dotenv.config({
    path: `./backend/.env`
})

const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.json())  //to parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }))  //to parse the form data(url encoded)

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectMongoDB();
})
