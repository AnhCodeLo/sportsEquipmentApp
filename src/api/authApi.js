import axios from "axios";
import BASE_URL from "../config";

/**
 * Gửi yêu cầu đăng ký tài khoản
 * @param {string} name - Họ tên
 * @param {string} email - Email đăng ký
 * @param {string} password - Mật khẩu
 */
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Đăng ký thất bại";
  }
};
