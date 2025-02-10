import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "react-native-vector-icons";

export default function SignUpScreen({ navigation }) {
  const [agree, setAgree] = useState(false);

  return (
    <LinearGradient colors={["#B6D6F4", "#ffffff"]} style={styles.container}>
      {}
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
          placeholderTextColor="#888"
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
          placeholderTextColor="#888"
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
          placeholderTextColor="#888"
          secureTextEntry
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
          placeholderTextColor="#888"
          secureTextEntry
        />
      </View>

      {/* Checkbox "Agree Terms" */}
      <View style={styles.agreeContainer}>
        <CheckBox
          title="I agree to the Terms & Conditions"
          checked={agree}
          onPress={() => setAgree(!agree)}
          containerStyle={styles.checkboxContainer}
          checkedColor="#8e44ad"
          textStyle={styles.checkboxText}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "95%",
    height: 180,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: -80,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6767",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: "90%",
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 50, color: "#333" },
  agreeContainer: {
    flexDirection: "row",
    width: "90%",
    marginBottom: 20,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  checkboxText: {
    color: "#4b0082",
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "90%",
    marginBottom: 15,
  },
  signUpText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  loginText: { color: "#4b0082", fontSize: 14, textAlign: "center" },
  loginLink: { color: "#8e44ad", fontWeight: "bold" },
});
