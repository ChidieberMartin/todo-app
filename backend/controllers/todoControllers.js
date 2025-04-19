import {
    createTodoList, findTodosByUser, updateOneTodo,
    deleteOneTodo, addCommentToTodo, deleteCommentFromTodo
} from '../services/todoService.js';

// ✅ Get all Todos for the logged-in user
export const getAllTodo = async (req, res) => {
    const todos = await findTodosByUser(req.user.id);
    res.status(200).json({ success: true, message: "Todos fetched successfully", todos });
};

// ✅ Create a Todo for the logged-in user
export const createOneTodo = async (req, res) => {
    const { text } = req.body;

    if (!text) return res.status(400).json({ success: false, message: "Text is required" });

    try {
        const newTodo = await createTodoList(req.user.id, { text });
        res.status(201).json({ success: true, message: "Todo created successfully", data: newTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Update a Todo (only if the user owns it)
export const updateTodo = async (req, res) => {
    const { todoId, text } = req.body;

    try {
        const updatedTodo = await updateOneTodo(req.user.id, todoId, { text });
        if (!updatedTodo) return res.status(403).json({ success: false, message: "Unauthorized" });

        res.status(200).json({ success: true, message: "Todo updated successfully", data: updatedTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Delete a Todo (only if the user owns it)
export const deleteTodo = async (req, res) => {
    const { todoId } = req.body;

    try {
        const deletedTodo = await deleteOneTodo(req.user.id, todoId);
        if (!deletedTodo) return res.status(403).json({ success: false, message: "Unauthorized" });

        res.status(200).json({ success: true, message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Add a comment (only to own Todos)
export const addComment = async (req, res) => {
    const { todoId, comment } = req.body;

    if (!comment) return res.status(400).json({ success: false, message: "Comment is required" });

    try {
        const updatedTodo = await addCommentToTodo(req.user.id, todoId, comment);
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ✅ Delete a comment (only if the user wrote it)
export const deleteComment = async (req, res) => {
    const { todoId, commentId } = req.params;

    try {
        const result = await deleteCommentFromTodo(req.user.id, todoId, commentId);
        if (!result.success) return res.status(403).json(result);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
