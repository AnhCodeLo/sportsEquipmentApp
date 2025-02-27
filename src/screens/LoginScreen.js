import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "../styles/LoginStyles";
import BASE_URL from "../config";
import { jwtDecode } from "jwt-decode";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập email và mật khẩu");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });

      console.log("Response từ API:", response.data); // Ghi log phản hồi từ server

      if (response.data.token) {
        // Giải mã token để lấy userId
        const decodedToken = jwtDecode(response.data.token);
        const userId = decodedToken.id;

        // Lưu userId và token vào AsyncStorage
        await AsyncStorage.setItem("userId", userId);
        await AsyncStorage.setItem("authToken", response.data.token);
        console.log("Đã lưu userId vào AsyncStorage:", userId);

        Alert.alert("Thành công", "Đăng nhập thành công!", [
          { text: "OK", onPress: () => navigation.navigate("HomeScreen") },
        ]);
      } else {
        console.log("Lỗi: Không có token trong phản hồi từ server");
        Alert.alert("Lỗi", "Không nhận được token từ server.");
      }
    } catch (error) {
      console.log("Lỗi đăng nhập:", error.response?.data || error.message);
      Alert.alert("Lỗi", error.response?.data?.error || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#B6D6F4", "#ffffff"]} style={styles.container}>
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/e9/36/01/e93601c890c17f7cd6cc9625ee18cdac.jpg",
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>Let's sign you in</Text>

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
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

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
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.passwordOptions}>
        <TouchableOpacity
          style={styles.rememberContainer}
          onPress={() => setRemember(!remember)}
          activeOpacity={0.8}
        >
          <Checkbox.Android
            status={remember ? "checked" : "unchecked"}
            color="#8e44ad"
          />
          <Text style={styles.checkboxText}>Remember Password</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.otherLoginContainer}>
        <Text style={styles.orText}>Or sign in with</Text>
        <TouchableOpacity style={styles.googleButton}>
          <Ionicons
            name="logo-google"
            size={20}
            color="#fff"
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
