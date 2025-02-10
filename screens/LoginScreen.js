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
import { FontAwesome, Ionicons } from "react-native-vector-icons";

export default function LoginScreen({ navigation }) {
  const [remember, setRemember] = useState(false);

  return (
    <LinearGradient colors={["#B6D6F4", "#ffffff"]} style={styles.container}>
      {/* Hình ảnh trên cùng */}
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/e9/36/01/e93601c890c17f7cd6cc9625ee18cdac.jpg",
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>Let's sign you in</Text>

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

      {/* Remember Password và Forgot Password */}
      <View style={styles.passwordOptions}>
        <CheckBox
          title="Remember Password"
          checked={remember}
          onPress={() => setRemember(!remember)}
          containerStyle={styles.checkboxContainer}
          checkedColor="#8e44ad"
          textStyle={styles.checkboxText}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {}
      <View style={styles.otherLoginContainer}>
        <Text style={styles.orText}>Or sign in with</Text>
        <TouchableOpacity style={styles.googleButton}>
          <FontAwesome
            name="google"
            size={20}
            color="#fff"
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
      {/* Navigate to Sign Up */}
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
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
    fontSize: 32,
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
    marginBottom: 20,
    width: "90%",
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 50, color: "#333" },
  passwordOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginBottom: 30,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  checkboxText: {
    color: "#4b0082",
    fontSize: 14,
    marginLeft: -3,
  },
  forgotPassword: { fontSize: 14, color: "#4b0082" },

  /* Nút Login */
  loginButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  loginText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  /* Cụm Google + "Or sign in with" */
  otherLoginContainer: {
    alignItems: "center",
    width: "90%",
  },
  orText: {
    fontSize: 14,
    color: "#4b0082",
    marginBottom: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DB4437",
    paddingVertical: 12,
    borderRadius: 30,
    justifyContent: "center",
    width: "70%",
  },
  googleIcon: {
    marginRight: 10,
  },
  googleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    color: "#4b0082",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
  signUpLink: {
    color: "#8e44ad",
    fontWeight: "bold",
  },
});
