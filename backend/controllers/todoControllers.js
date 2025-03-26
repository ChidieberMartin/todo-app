import { createTodoList, updateOneTodo, findManyUsers, deleteOneTodo } from '../services/todoService.js';

export const getAllTodo = async (req, res) => {
    const todos = await findManyUsers();
    res.status(200).json({ success: true, message: "Resource fetched successfully", todos: todos })
}




export const createOneTodo = (req, res) => {
    const { text } = req.body;

    // Validate input
    if (!text) {
        return res.status(400).send({ success: false, message: "Text is required" });
    }

    try {
        // Add the new Todo item
        const addList = createTodoList({ text });

        

        // Send response
        res.status(201).send({
            success: true,
            message: "Resource created successfully",
            data: addList,
        });
    } catch (error) {
        // Handle errors
        res.status(500).send({ success: false, message: "Server error" });
    }
};


export const updateTodo = (req, res) => {
    const { _id, text } = req.body
    try {
        const editTodo = updateOneTodo(_id, { text })
        res.send({ success: true, message: "Resource update successfully", data: editTodo })
    } catch (error) {

        console.error(error, "faild to update")
        res.send({ success: false, message: "Resource update failed" })
    }

}

export const deleteTodo = (req, res) => {
    const { _id } = req.body

    try {
        const deleteTodo = deleteOneTodo(_id)
        
        

        res.send({ success: true, message: "Resource delete successfully", data: deleteTodo })
    } catch (error) {
        res.send({ success: true, message: "Resource delete failed" })
    }

}