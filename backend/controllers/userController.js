const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Đăng ký user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//========================================================================

// Đăng nhập user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email }, // ✅ Giữ nguyên user ID
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, userId: user._id }); // ✅ Đảm bảo trả về userId
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//========================================================================
// Thêm sản phẩm yêu thích
const toggleFavoriteProduct = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ error: "Người dùng không tồn tại" });

    const isFavorite = user.favoriteProducts.includes(productId);

    if (isFavorite) {
      user.favoriteProducts = user.favoriteProducts.filter(
        (id) => id.toString() !== productId
      );
    } else {
      user.favoriteProducts.push(productId);
    }

    await user.save();
    res.json({ success: true, favoriteProducts: user.favoriteProducts });
  } catch (error) {
    res.status(500).json({ error: "Có lỗi xảy ra", details: error.message });
  }
};

// Lấy danh sách sản phẩm yêu thích của người dùng
const getFavoriteProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log(`📌 Nhận request lấy danh sách yêu thích cho user: ${userId}`);
    const user = await User.findById(userId).populate("favoriteProducts");
    if (!user) {
      console.error("❌ User không tồn tại!");
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }
    console.log(
      "✅ Trả về danh sách yêu thích của user:",
      user.favoriteProducts
    );
    res.json({ favoriteProducts: user.favoriteProducts });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách yêu thích:", error);
    res.status(500).json({ error: "Có lỗi xảy ra", details: error.message });
  }
};

//========================================================================
// Xóa sản phẩm yêu thích của người dùng
const removeFavoriteProduct = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    console.log(`🔍 Đang kiểm tra user: ${userId}, product: ${productId}`);

    const user = await User.findById(userId);
    if (!user) {
      console.error("❌ User không tồn tại!");
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    console.log("✅ Tìm thấy user:", user.name);

    const isFavorite = user.favoriteProducts.includes(productId);
    if (!isFavorite) {
      console.error("❌ Sản phẩm không có trong danh sách yêu thích!");
      return res
        .status(404)
        .json({ error: "Sản phẩm không có trong danh sách yêu thích" });
    }

    // Xóa sản phẩm khỏi danh sách yêu thích
    user.favoriteProducts = user.favoriteProducts.filter(
      (id) => id.toString() !== productId
    );

    await user.save();
    console.log("✅ Xóa thành công!");

    res.json({
      success: true,
      message: "Đã xóa sản phẩm yêu thích thành công",
      favoriteProducts: user.favoriteProducts,
    });
  } catch (error) {
    console.error("❌ Lỗi xóa sản phẩm:", error);
    res.status(500).json({
      error: "Có lỗi xảy ra khi xóa sản phẩm yêu thích",
      details: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  toggleFavoriteProduct,
  getFavoriteProducts,
  removeFavoriteProduct,
};
