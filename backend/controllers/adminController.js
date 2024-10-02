const User = require("../models/User");

// Lấy danh sách tất cả người dùng (Chỉ dành cho Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Không trả về mật khẩu
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Cập nhật quyền của người dùng (Chỉ dành cho Admin)
exports.updateUserRole = async (req, res) => {
  const { role } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.isAdmin = role === "admin"; // Cập nhật quyền admin
    await user.save();
    res.json({ msg: "User role updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Xóa người dùng (Chỉ dành cho Admin)
exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.remove();
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
