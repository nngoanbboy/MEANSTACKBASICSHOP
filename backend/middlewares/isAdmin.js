module.exports = function (req, res, next) {
  // Kiểm tra xem người dùng có quyền admin không
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ msg: "Access denied, admin only" });
  }
  next();
};
