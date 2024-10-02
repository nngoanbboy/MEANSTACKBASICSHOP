const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

module.exports = function (req, res, next) {
  // Lấy token từ header
  const token = req.cookies.token;

  // Kiểm tra nếu không có token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Xác minh token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET từ .env
    req.user = decoded.user; // Lưu thông tin người dùng vào req để sử dụng trong các controller
    next(); // Cho phép tiếp tục xử lý request
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
