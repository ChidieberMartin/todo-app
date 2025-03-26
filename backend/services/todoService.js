import todoModel from "../model/todoModel.js";

export const createTodoList = async (data) => {
    const result = await todoModel.create(data)
    return result
}

export const findOneTodo = async (query = {}) => {
    const result = await todoModel.findOne(query)
    return result
}

export const updateOneTodo = async (filter, dataUpdate) => {
    const result = await todoModel.findByIdAndUpdate(filter, dataUpdate)
    return result
}

export const findManyUsers = async (query = {}) => {
    const result = todoModel.find(query)
    return result
}

export const deleteOneTodo = async (data) => {
    const result = await todoModel.findByIdAndDelete(data)
    return result
}
