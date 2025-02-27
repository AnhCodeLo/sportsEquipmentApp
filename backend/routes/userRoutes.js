const express = require("express");
const {
  registerUser,
  loginUser,
  toggleFavoriteProduct,
  getFavoriteProducts,
  removeFavoriteProduct,
} = require("../controllers/userController");

const router = express.Router();

// Đăng ký user
router.post("/signup", registerUser);

// Đăng nhập user
router.post("/login", loginUser);

// Thêm/xóa sản phẩm yêu thích
router.post("/favorite", toggleFavoriteProduct);
router.get("/favorite/:userId", getFavoriteProducts);
router.delete("/favorite/:userId/:productId", removeFavoriteProduct);

module.exports = router;
