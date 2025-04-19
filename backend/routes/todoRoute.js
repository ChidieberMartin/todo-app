import express from "express";
import { getAllTodo, createOneTodo, updateTodo, deleteTodo, addComment, deleteComment } from "../controllers/todoControllers.js";
import { protect } from "../middleware/authMiddleware.js"; // Middleware to verify JWT

const router = express.Router();

router.get("/", protect, getAllTodo);
router.post("/create", protect, createOneTodo);
router.put("/update", protect, updateTodo);
router.delete("/delete", protect, deleteTodo);
router.post("/comment", protect, addComment);
router.delete("/:todoId/comment/:commentId", protect, deleteComment);

export default router;
