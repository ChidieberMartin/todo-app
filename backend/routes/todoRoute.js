import express from'express'
const router = express.Router()

import { getAllTodo,createOneTodo,updateTodo,deleteTodo } from '../controllers/todoControllers.js'


router.get("/",getAllTodo)
router.post("/create",createOneTodo)
router.put("/update",updateTodo)
router.delete("/delete",deleteTodo)

export default router