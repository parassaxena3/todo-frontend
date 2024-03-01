import React, { useState, useEffect } from "react";
const BASE_URL = "http://localhost:3000/api/"; 
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get(BASE_URL + "todos")
      .then((res) => {
        todos=res.data;
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(BASE_URL + "todos", {
        title: newTodo,
        completed: false,
      })
      .then((res) => {
        setTodos([...todos, res.data]);
        setNewTodo("");
      })
      .catch((err) => console.log(err));
  };

  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo._id === id) {
        todo.completed = !todo.completed;
        axios
          .put(`${BASE_URL}todos/${id}`, {
            completed: todo.completed,
          })
          .catch((err) => console.log(err));
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={handleChange}
          placeholder="Enter a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <span onClick={() => handleToggle(todo._id)}>{todo.title}</span>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
