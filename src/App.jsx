import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.error("Error fetching todos:", error));
  };

  const handleSubmit = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: todo,
        completed: false,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("Task added successfully");
          alert("Task added successfully");
          setTodo("");
          fetchTodos();
        } else {
          console.error("Error adding task:", response.status);
        }
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
