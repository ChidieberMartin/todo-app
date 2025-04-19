import express from 'express';
const app = express()
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from'./db/mongoose.js';
import todoroutes from './routes/todoRoute.js';
import userRoutes from './routes/userRoute.js';

app.use(cors())
dotenv.config()

app.use(express.json())
app.use("/api/users",userRoutes)
app.use("/api/todo",todoroutes)



const port = process.env.PORT || 4000

app.listen(port, () => {
    connectDb();
    console.log(`Connected on port http://localhost:${port}`)
})