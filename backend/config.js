const dotenv = require("dotenv");

// Tải các biến môi trường từ file .env
dotenv.config();

const config = {
  // Cổng máy chủ
  PORT: process.env.PORT || 5000,

  // Cấu hình cơ sở dữ liệu
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/Products",

  // Khóa bí mật cho JWT
  JWT_SECRET: process.env.JWT_SECRET || "156a5sfd1a3s2asf",

  // Cấu hình cho môi trường
  ENV: process.env.NODE_ENV || "development",

  // Các cấu hình khác nếu cần
};

module.exports = config;
