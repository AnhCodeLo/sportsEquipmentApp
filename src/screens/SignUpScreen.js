import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "react-native-vector-icons";
import styles from "../styles/SignUpStyles";
import { registerUser } from "../api/authApi";
import BASE_URL from "../config";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  // Xử lý đăng ký
  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    if (!agree) {
      Alert.alert("Error", "You must agree to the Terms & Conditions.");
      return;
    }

    try {
      await registerUser(name, email, password);
      Alert.alert("Success", "Registration successful!");
      navigation.navigate("Login"); // Chuyển hướng sang Login
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  return (
    <LinearGradient colors={["#B6D6F4", "#ffffff"]} style={styles.container}>
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/04/82/6d/04826dce193bf7644357aed28652d7a3.jpg",
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>Create Your Account</Text>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Checkbox "Agree Terms" */}
      <View style={styles.agreeContainer}>
        <TouchableOpacity
          onPress={() => setAgree(!agree)}
          style={[styles.checkboxWrapper, agree && styles.checkboxChecked]}
        >
          <Checkbox
            status={agree ? "checked" : "unchecked"}
            onPress={() => setAgree(!agree)}
            color="#8e44ad"
          />
        </TouchableOpacity>
        <Text style={styles.checkboxText}>
          I agree to the Terms & Conditions
        </Text>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
