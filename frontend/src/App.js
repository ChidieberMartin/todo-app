import Todo from './component/Todo';
import { useEffect, useState } from 'react';
import './App.css';
import { getAllTodo, addTodo, updateTodo, deleteTodo } from './utils/HandleTodo';




function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");

  const fetchAllTodos= async () => {
    const getTodos = await getAllTodo();


    if(getTodos.success){
      setTodos(getTodos.data);
    }
  };

  useEffect(()=> {
    fetchAllTodos()
  },[])

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setTodoId(_id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo App</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Add todo......"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          {todos.map((item) => {
            return (
              <Todo
                key={item._id}
                text={item.text}
                updateMode={() => updateMode(item._id, item.text)}
                deleteTodo={() => deleteTodo(item._id, setTodos)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}



export default App;
