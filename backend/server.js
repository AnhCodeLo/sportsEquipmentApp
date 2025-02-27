require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(express.json());

// Kết nối MongoDB
connectDB();

// Routes (✅ Bỏ "users" để đồng bộ)
app.use("/api", userRoutes);
app.use("/api/products", productRoutes);

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Middleware log request
app.use((req, res, next) => {
  console.log(`📢 Request: ${req.method} ${req.url} - Body:`, req.body);
  next();
});
