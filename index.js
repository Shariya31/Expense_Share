// import http from 'http'
import app from './app.js'
import { connectDB } from './src/database/connectDb.js'

const PORT = process.env.PORT || 4000
const mongoURI = process.env.MONGO_URI || ""
connectDB(mongoURI)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

