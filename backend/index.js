import express from 'express';
const app = express()
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from'./db/mongoose.js';
import router from './routes/todoRoute.js';

app.use(cors())
dotenv.config()

app.use(express.json())
app.use("/api/todo",router)



const port = process.env.PORT || 4000

app.listen(port, () => {
    connectDb();
    console.log(`Connected on port http://localhost:${port}`)
})