import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "./Auth";
import TodoApp from "./TodoApp";

export default function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from the API
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/getTodos");
        setTodos(response.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [user]);

  const handleLogin = (username, password) => {
    if (username.trim() === "" || password.trim() === "") {
      
      return;
    }


   
    const loggedInUser = { username };
    setUser(loggedInUser);
  };

  const handleSignup = (username, password) => {
    if (username.trim() === "" || password.trim() === "") {
     
      return;
    }

    // Your signup logic here
    // For simplicity, let's assume successful signup
    const newUser = { username };
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSaveTodos = async () => {
    try {
      await axios.post("/createTodos", { todos });
      console.log("Todos saved successfully");
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  };

  return (
    <>
      {user ? (
        <TodoApp
          username={user.username}
          todos={todos}
          setTodos={setTodos}
          onLogout={handleLogout}
          onSaveTodos={handleSaveTodos}
        />
      ) : (
        <Auth onLogin={handleLogin} onSignup={handleSignup} />
      )}
    </>
  );
}
