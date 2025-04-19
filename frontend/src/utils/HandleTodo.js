import axios from 'axios';

const baseurl = 'http://localhost:4000/api/todo';





const getAllTodo = async () => {
  try {
    // const items = await axios.get(baseurl)


    const token = localStorage.getItem("token");
    console.log("token", token)
    const items = await axios.get("http://localhost:4000/api/todo", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("items", items)

    return { success: true, message: "Resource fetch successfully", data: items.data.todos }
  } catch (err) {
    const message = ("Error fetching todos:", err.response || err.message);
    return { success: false, message }
  };
};


const addTodo = async (text, setText, setTodo) => {
  if (!text.trim()) {
    console.error("Todo text is empty!");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found. User might be logged out.");
    return;
  }

  try {
    const response = await axios.post(`${baseurl}/create`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Added Todo:", response.data);
    if (response.data.success) {
      setTodo((prevTodos) => [...prevTodos, response.data.data]);
      setText("");
    } else {
      console.error("Failed to add todo:", response.data.message);
    }
  } catch (err) {
    console.error("Error adding todo:", err.response?.data || err.message);
  }
};



const updateTodo = (todoId, text, setTodo, setText, setIsUpdating) => {
  if (!text.trim()) {
    console.error("Todo text is empty!"); // Ensure input is not blank
    return;
  }
  // .put(`${baseurl}/update`, { _id: todoId, text })
  const token = localStorage.getItem("token");
  console.log("Token sent:", token);

  axios.put(`${baseurl}/update`, { todoId, text }, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(({ data }) => {
      const updatedTodo = data.data; // 🔥 Correctly accessing the todo object
      console.log("Update response:", data);

      setTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        )
      );
      setText(""); // Clear input
      setIsUpdating(false); // Exit update mode
    })
    .catch((err) => console.error("Error updating todo:", err.response || err.message));
};


const deleteTodo = (_id, setTodo) => {
  const token = localStorage.getItem("token");
  axios.delete(`${baseurl}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { todoId: _id }
  })

    .then(() => {
      console.log(`Deleted Todo with ID: ${_id}`); // Debugging
      setTodo((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
    })
    .catch((err) => console.error("Error deleting todo:", err.response || err.message));
};


export const deleteComment = async (todoId, commentId, setTodos) => {
  try {
    const response = await axios.delete(`http://localhost:4000/api/todo/${todoId}/comments/${commentId}`);

    if (response.data.success) {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === todoId
            ? { ...todo, comments: todo.comments.filter(comment => comment._id !== commentId) }
            : todo
        )
      );
    } else {
      alert(response.data.message);
    }

    if (response.data.success) {
      alert("Delete successfully")
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};



export { getAllTodo, addTodo, updateTodo, deleteTodo };


