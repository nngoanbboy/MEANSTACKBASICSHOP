const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  // Nếu có lỗi trong dữ liệu gửi lên
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next(); // Nếu không có lỗi, tiếp tục xử lý request
};
