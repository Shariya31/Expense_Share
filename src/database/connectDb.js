import mongoose from "mongoose"

export const connectDB = async(uri)=>{
    mongoose.connect(uri, {
        dbName: "assessment",
    }).then(c => console.log(`DB is connected to ${c.connection.host}`)).catch(e => console.log(e))
}