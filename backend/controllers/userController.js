const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Đăng ký người dùng mới
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;

        // Đặt cookie
        res.cookie("token", token, {
          httpOnly: true, // Ngăn chặn truy cập cookie từ client-side
          secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS trong môi trường production
          maxAge: 3600000, // 1 giờ
        });

        res.json({ msg: "User registered successfully" });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;

        // Đặt cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600000,
        });

        res.json({ msg: "User logged in successfully", token: token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
// Đăng xuất người dùng
exports.logout = (req, res) => {
  res.clearCookie("token"); // Xóa cookie token
  res.json({ msg: "User logged out successfully" }); // Trả về thông báo
};

// Lấy thông tin cá nhân
exports.getUserProfile = async (req, res) => {
  try {
    // Tìm người dùng theo ID từ JWT (req.user.id đã được lưu từ middleware auth)
    const user = await User.findById(req.user.id).select("-password"); // Không trả về mật khẩu
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user); // Trả về thông tin người dùng
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
