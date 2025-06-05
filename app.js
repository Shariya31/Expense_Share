import express from 'express'
import cors from "cors"
import { config } from 'dotenv'
import { errorMiddleware } from './src/middlewares/error.js'

// routes imported
import userRoutes from './src/routes/userRoutes.js'

config({
    path: ".env"
})

const app = express()
app.use(cors())

app.use(express.json())

app.get('/', (req, res)=>{
    res.send("running")
})

// using routes
// app.use("/api/v1", bookRoutes)
app.use('/api/auth', userRoutes);
app.use(errorMiddleware)

export default app
// app.listen(PORT, ()=>{
//     console.log(`App is running on http://localhost:${PORT}`)
// })

