import TodoModel from "../model/todoModel.js";

// ✅ Create a Todo linked to a specific user
export const createTodoList = async (userId, data) => {
    return await TodoModel.create({ ...data, userId });
};

// ✅ Find Todos for the logged-in user only
export const findTodosByUser = async (userId) => {
    return await TodoModel.find({ userId });
};

// ✅ Update Todo only if it belongs to the user
export const updateOneTodo = async (userId, todoId, dataUpdate) => {
    return await TodoModel.findOneAndUpdate({ _id: todoId, userId }, dataUpdate, { new: true });
};

// ✅ Delete Todo only if it belongs to the user
export const deleteOneTodo = async (userId, todoId) => {
    return await TodoModel.findOneAndDelete({ _id: todoId, userId });
};

// ✅ Add a comment (only if the user owns the Todo)
export const addCommentToTodo = async (userId, todoId, commentText) => {
    const todo = await TodoModel.findOne({ _id: todoId, userId });

    if (!todo) return { success: false, message: "Todo not found or unauthorized" };
    if (todo.comments.length >= 10) return { success: false, message: "Maximum of 10 comments reached" };

    todo.comments.push({ text: commentText, userId });
    await todo.save();

    return { success: true, message: "Comment added successfully", todo };
};

// ✅ Delete a comment (only if the user created it)
export const deleteCommentFromTodo = async (userId, todoId, commentId) => {
    const todo = await TodoModel.findOne({ _id: todoId, "comments._id": commentId });

    if (!todo) return { success: false, message: "Todo or comment not found" };

    const comment = todo.comments.id(commentId);
    if (!comment || comment.userId.toString() !== userId) {
        return { success: false, message: "Unauthorized to delete this comment" };
    }

    comment.remove();
    await todo.save();

    return { success: true, message: "Comment deleted successfully", todo };
};
