import React from 'react'
import Todo from '../../components/Todo/Todo.js';
import Comment from '../../components/Comment/Comment.js';
import { useEffect, useState } from 'react';
import '../../App.css';
import './Home.css'
import axios from 'axios';
import Logout from "../../components/Logout/Logout.js";
import { jwtDecode } from "jwt-decode";



import { getAllTodo, addTodo, updateTodo, deleteTodo } from '../../utils/HandleTodo.js';

const Home = () => {

    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;
    const userId = user ? user.id : null;  // Extract logged-in user ID


    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [todoId, setTodoId] = useState("");

    // Comment modal state
    const [isCommenting, setIsCommenting] = useState(false);
    const [currentTodoId, setCurrentTodoId] = useState("");
    const [commentText, setCommentText] = useState("");

    const fetchAllTodos = async () => {
        try {
            const getTodos = await getAllTodo();
            if (getTodos.success) {
                setTodos(getTodos.data);
            }

        } catch (error) {
            console.error("Error fetching todos:", error);
        }

    }

    useEffect(() => {
        fetchAllTodos();
    }, [])


    useEffect(() => {
        console.log("Props received in Todo:", { updateMode, deleteTodo });
    }, []);


    const updateMode = (_id, text) => {
        setIsUpdating(true);
        setText(text);
        setTodoId(_id);
    };

    // Open comment modal
    const openCommentModal = (_id) => {
        setCurrentTodoId(_id);
        setIsCommenting(true);
    };

    // Close comment modal
    const closeCommentModal = () => {
        setIsCommenting(false);
        setCommentText("");
    };


    const submitComment = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/todo/comment", {
                todoId: currentTodoId,
                comment: commentText,
                userId // ✅ Include logged-in user ID if needed
            }, { headers: { Authorization: `Bearer ${token}` } });


            if (!response.data.success) {
                alert(response.data.message); // 🚨 Show message if limit reached
                return;
            }

            // ✅ Update the UI without refreshing
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === currentTodoId
                        ? { ...todo, comments: [...todo.comments, { text: commentText }] }
                        : todo
                )
            );

            alert("Comment added!");
            closeCommentModal();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };


    return (
        <>
            <Logout />
            <div className="Home-container">
                <div className="todo-container">
                    <h1>Todo App</h1>

                    <div className="top">
                        <input
                            type="text"
                            placeholder="Add todo......"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className='todo-input'
                        />
                        <div
                            className="add"
                            onClick={
                                isUpdating
                                    ? () => updateTodo(todoId, text, setTodos, setText, setIsUpdating)
                                    : () => addTodo(text, setText, setTodos)
                            }
                        >
                            {isUpdating ? "Updating" : "Add"}
                        </div>
                    </div>

                    <div className="list">
                        {Array.isArray(todos) && todos.length > 0 ? (
                            todos.map((item) => (
                                <Todo
                                    key={item._id}
                                    text={item.text}
                                    comments={item.comments || []}
                                    updateMode={() => updateMode(item._id, item.text)}
                                    deleteTodo={() => deleteTodo(item._id, setTodos)}
                                    todoId={item._id}
                                    setTodos={setTodos}
                                    openCommentModal={() => openCommentModal(item._id)}
                                    userId={userId} // ✅ Pass the logged-in user ID
                                />

                            ))
                        ) : (
                            <p>No todos found</p> // ✅ Prevents errors when `todos` is empty
                        )}
                    </div>
                    <div>
                        {isCommenting && (
                            <Comment
                                commentText={commentText}
                                setCommentText={setCommentText}
                                submitComment={submitComment}
                                closeCommentModal={closeCommentModal}
                            />
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}

export default Home