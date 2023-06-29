import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

export default function TodoApp({ username, onLogout }) {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Fetch todos from the API on mount
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://192.168.1.16:3000/api/v1/todo/getTodos");
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = () => {
    if (editIndex !== null) {
      // Editing existing todo
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = todo;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Adding new todo
      if (todo.trim()) {
        setTodos([...todos, todo]);
      }
    }
    setTodo("");
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setTodo(todos[index]);
  };

  const handleDeleteTodo = (index) => {
    Alert.alert(
      "Delete Todo",
      "Are you sure you want to delete this todo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedTodos = [...todos];
            updatedTodos.splice(index, 1);
            setTodos(updatedTodos);
            if (editIndex === index) {
              setEditIndex(null);
              setTodo("");
            }
          },
        },
      ]
    );
  };

  const handleSaveTodos = async () => {
    try {
      const todosPayload = todos.map(todo => ({
        title: todo,
        userId: user.userId
      }));
  
      const response = await axios.post("http://192.168.1.16:3000/api/v1/todo/createTodos", { todos: todosPayload });
  
      if (response.status === 200) {
        Alert.alert("Success", "Todos saved successfully");
      } else {
        Alert.alert("Error", "Failed to save todos");
      }
    } catch (error) {
      console.error("Error saving todos:", error);
      Alert.alert("Error", "Failed to save todos");
    }
  };
  

  const handleLogout = () => {
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome, {username}!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a todo"
          value={todo}
          onChangeText={(text) => setTodo(text)}
        />
        <Button title={editIndex !== null ? "Update" : "Add Todo"} onPress={handleAddTodo} />
      </View>

      {todos.length > 0 ? (
        <ScrollView style={styles.todoList}>
          {todos.map((item, index) => (
            <View key={index} style={styles.todoItemContainer}>
              <Text style={styles.todoItem}>{item}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEditTodo(index)}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTodo(index)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.emptyState}>No todos yet</Text>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTodos}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
  },
  todoList: {
    flex: 1,
    width: "100%",
  },
  todoItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  todoItem: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    marginRight: 5,
  },
  editButtonText: {
    color: "#fff",
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#F44336",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
  },
  emptyState: {
    fontSize: 16,
    fontStyle: "italic",
  },
  saveButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FF0000",
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
