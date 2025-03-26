import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

const todoModel = mongoose.model("Todos", todoSchema)

export default todoModel