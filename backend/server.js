const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // Import mongoose
const cookieParser = require("cookie-parser"); // Import cookie-parser
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser()); // Sử dụng cookie-parser

// Kết nối tới MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("MongoDB connected");
    // Bắt đầu lắng nghe server chỉ khi kết nối thành công
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
