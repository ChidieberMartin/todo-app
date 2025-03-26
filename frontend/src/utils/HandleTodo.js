import axios from 'axios';
console.log("Axios Object:", axios);

const baseurl = 'http://localhost:4000/api/todo';





const getAllTodo = async () => {
  try {
    const items = await axios.get(baseurl)
    return { success: true, message: "Resource fetch successfully", data: items.data.todos}
  } catch (err) {
    const message = ("Error fetching todos:", err.response || err.message);
    return { success: false, message }
  };
};



const addTodo = (text, setText, setTodo) => {
  if (!text.trim()) {
    console.error("Todo text is empty!"); // Ensure input is not blank
    return;
  }
  axios
    .post(`${baseurl}/create`, { text })
    .then(({ data: newTodo }) => {
      console.log("Added Todo:", newTodo); // Debugging
      setTodo((prevTodos) => [...prevTodos, newTodo]); // Append new todo
      setText(""); // Clear the input field
    })
    .catch((err) => console.error("Error adding todo:", err.response || err.message));
};


const updateTodo = (todoId, text, setTodo, setText, setIsUpdating) => {
  if (!text.trim()) {
    console.error("Todo text is empty!"); // Ensure input is not blank
    return;
  }
  axios
    .put(`${baseurl}/update`, { _id: todoId, text })
    .then(({ data: updatedTodo }) => {
      // console.log("Updated Todo:", updatedTodo); 
      setTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        )
      );
      setText(""); // Clear the input field
      setIsUpdating(false); // Reset update mode
    })
    .catch((err) => console.error("Error updating todo:", err.response || err.message));
};


const deleteTodo = (_id, setTodo) => {
  axios
    .delete(`${baseurl}/delete`, { data: { _id } }) // Ensure the backend supports this
    .then(() => {
      console.log(`Deleted Todo with ID: ${_id}`); // Debugging
      setTodo((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
    })
    .catch((err) => console.error("Error deleting todo:", err.response || err.message));
};

export { getAllTodo, addTodo, updateTodo, deleteTodo };


