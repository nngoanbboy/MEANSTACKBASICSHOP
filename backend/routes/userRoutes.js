const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserProfile,
  logout,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

// Đăng ký tài khoản người dùng mới
router.post("/register", register);

// Đăng nhập
router.post("/login", login);
// Logout
router.post("/logout", logout);

// Lấy thông tin cá nhân của người dùng (Chỉ dành cho người dùng đã đăng nhập)
router.get("/profile", auth, getUserProfile);

module.exports = router;
