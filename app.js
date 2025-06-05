import express from 'express'
import cors from "cors"
import { config } from 'dotenv'
import { errorMiddleware } from './src/middlewares/error.js'

// routes imported
import userRoutes from './src/routes/userRoutes.js'
import groupRoutes from './src/routes/groupRoutes.js'
import expenseRoutes from './src/routes/expenseRoutes.js'
import settlementRoutes from './src/routes/settlementRutes.js'

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
app.use('/api/auth', userRoutes);
app.use('/api/group', groupRoutes)
app.use('/api/groups', expenseRoutes)

app.use('/api/groups', settlementRoutes); // for POST /:groupId/settlements
app.use('/api/users', settlementRoutes);  // for GET /user/:userId/settlements
app.use(errorMiddleware)

export default app


