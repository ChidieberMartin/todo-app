import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Track who added the comment
    createdAt: { type: Date, default: Date.now }
});

const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Track who owns the todo
    comments: [commentSchema]
}, { timestamps: true });

const TodoModel = mongoose.model("Todo", todoSchema);
export default TodoModel;
