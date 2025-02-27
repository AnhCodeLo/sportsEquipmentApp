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
  checkboxWrapper: {
    width: 24,
    height: 24,
    borderWidth: 2, // Tạo viền xung quanh checkbox
    borderColor: "#8e44ad", // Màu viền
    borderRadius: 5, // Bo góc checkbox
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8, // Khoảng cách giữa checkbox và text
  },
  checkboxChecked: {
    backgroundColor: "#8e44ad", // Màu nền khi checked
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

export default styles;
