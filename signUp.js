import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import axios from 'axios';

export default function Signup({ onSignup, toggleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleSignup = () => {
    if (password === confirmPassword) {
      const data = {
        username,
        email,
        password,
        confirmPassword
      };

      axios.post('http://192.168.1.16/api/v1/authTodo/signUp', data)
        .then(response => {
          // Handle the response from the server
          console.log(response.data);
          // Additional logic based on the response

          // Call onSignup with the necessary data
          onSignup(username);
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    } else {
      setPasswordMatchError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        {passwordMatchError && <Text style={styles.errorText}>Passwords do not match.</Text>}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleLogin}>
          <Text style={styles.toggleButtonText}>Switch to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  toggleButtonText: {
    color: "#333",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
