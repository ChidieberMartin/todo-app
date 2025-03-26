import mongoose from "mongoose";
import dotenv from'dotenv'
dotenv.config()

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("🔥Mongodb connected successfully🔥")
    })
    .catch(()=> {
        console.log("❌ Failed to connect ❌")
    })
}

export default connectDb