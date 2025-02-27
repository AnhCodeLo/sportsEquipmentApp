import { StyleSheet } from "react-native";

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

  /* Sửa lại phần Remember Password & Forgot Password */
  passwordOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginBottom: 30,
  },

  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkboxWrapper: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#8e44ad",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8, // 🔥 Giảm khoảng cách checkbox & chữ
  },

  checkboxText: {
    fontSize: 14,
    color: "#4b0082",
  },

  forgotPassword: {
    fontSize: 14,
    color: "#4b0082",
  },

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

export default styles;
