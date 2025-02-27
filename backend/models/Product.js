const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tên sản phẩm không được để trống"],
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: [true, "Giá sản phẩm không được để trống"],
  },
  category: {
    type: String,
    default: "Thể thao",
  },
  image: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
