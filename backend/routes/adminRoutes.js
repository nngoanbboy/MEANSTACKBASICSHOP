const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
} = require("../controllers/adminController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

// Middleware `auth` để xác thực JWT token, `isAdmin` để kiểm tra quyền admin

// Lấy danh sách tất cả người dùng (Chỉ dành cho Admin)
router.get("/users", auth, isAdmin, getAllUsers);

// Cập nhật quyền của người dùng (Chỉ dành cho Admin)
router.put("/users/:id", auth, isAdmin, updateUserRole);

// Xóa người dùng (Chỉ dành cho Admin)
router.delete("/users/:id", auth, isAdmin, deleteUser);

module.exports = router;
