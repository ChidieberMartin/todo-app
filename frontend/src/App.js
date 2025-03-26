import Todo from './component/Todo';
// import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import './App.css';
import { getAllTodo, addTodo, updateTodo, deleteTodo } from './utils/HandleTodo';


// function App() {
//   const [todo, setTodos] = useState([])
//   const [text, setText] = useState("")
//   const [isUpdating, setIsUpdating] = useState(false)
//   const [todoId, setTodoId] = useState("")

//   // useEffect(() => {
//   //   getAllTodo(setTodos)
//   // }, [])


//   useEffect(() => {
//     getAllTodo((todos) => {
//       console.log("Fetched Todos:", todos); // Debugging
//       setTodos(todos);
//     });
//   }, []);
  

//   const updateMode = (_id, text) => {
//     setIsUpdating(true)
//     setText(text)
//     setTodoId(_id)
//   }

//   // const generateId = (_id) => {
//   //   return Math.floor(Math.random() * 100)

//   // }
//   return (
//     <div className="App">
//       <div className="container">
//         <h1>Todo App</h1>

//         <div className="top">
//           <input type="text"
//             placeholder="Add todo......"
//             value={text}
//             onChange={(e) => setText(e.target.value)} />

//           <div className="add"
//             onClick={isUpdating ? () => updateTodo(todoId, text, setTodos, setText, setIsUpdating)
//               : () => addTodo(text, setText, setTodos)}>
//             {isUpdating ? "updating" : "Add"}
//           </div>
//         </div>
//         <div className="list">
//           {/* {todo.map((item) => (
//             <Todo
//               key={uuidv4()} // Generate a unique ID for each item
//               text={item}
//               updateMode={() => updateMode(item._id, item.text)}
//               deleteTodo={() => deleteTodo(item._id, setTodos)}
//             />
//           ))} */}

//           {/* <div className="list">
//             {todo.map((item) => (
//               <Todo
//                 key={item._id} // Use unique _id for the key
//                 text={item.text} // Pass the correct text property
//                 updateMode={() => updateMode(item._id, item.text)}
//                 deleteTodo={() => deleteTodo(item._id, setTodos)}
//               />
//             ))}
//           </div> */}




//         </div>

//         <div className="list">
//           {todo.map((item) => {
//             console.log("Item text:", item.text); // Debugging
//             return (
//               <Todo
//                 key={item._id}
//                 text={item.text}
//                 updateMode={() => updateMode(item._id, item.text)}
//                 deleteTodo={() => deleteTodo(item._id, setTodos)}
//               />
//             );
//           })}
//         </div>



//       </div>
//     </div>
//   );
// }

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");

  const fetchAllTodos= async () => {
    const getTodos = await getAllTodo();

    // console.log('hvgghhghghhfhf', getTodos)

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
            // console.log("Item text:", item); 
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
