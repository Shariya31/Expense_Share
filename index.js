import express from 'express'
import cors from "cors"
import { config } from 'dotenv'
import { connectDB } from './src/database/connectDb.js'
import { errorMiddleware } from './src/middlewares/error.js'

// routes imported
import bookRoutes from './src/routes/books.js'

config({
    path: "./.env"
})

const PORT = process.env.PORT || 4000
const mongoURI = process.env.MONGO_URI || ""
connectDB(mongoURI)

const app = express()
app.use(cors())

app.use(express.json())

app.get('/', (req, res)=>{
    res.send("running")
})

// using routes
app.use("/api/v1", bookRoutes)
app.use(errorMiddleware)
app.listen(PORT, ()=>{
    console.log(`App is running on http://localhost:${PORT}`)
})

