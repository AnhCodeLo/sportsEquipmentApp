const Product = require("../models/Product");

// Thêm sản phẩm
const addProduct = async (req, res) => {
  const { name, description, price, category, image } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Tên và giá sản phẩm là bắt buộc" });
  }

  try {
    const product = new Product({
      name,
      description,
      price,
      category, // Nếu không truyền, mặc định là "Thể thao" theo schema
      image,
    });
    await product.save();
    return res.status(201).json({
      message: "Thêm sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Có lỗi xảy ra khi thêm sản phẩm",
      details: error.message,
    });
  }
};

// List sản phẩm
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Mặc định page = 1
    const limit = parseInt(req.query.limit) || 4; // Mặc định limit = 4
    const skip = (page - 1) * limit; // Tính số sản phẩm cần bỏ qua

    // Lấy sản phẩm từ database với phân trang
    const products = await Product.find().skip(skip).limit(limit);
    return res.status(200).json({
      message: "Lấy danh sách sản phẩm thành công",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Có lỗi xảy ra khi lấy danh sách sản phẩm",
      details: error.message,
    });
  }
};

module.exports = { addProduct, getProducts };
