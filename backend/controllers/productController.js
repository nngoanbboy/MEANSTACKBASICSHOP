const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Lấy danh sách sản phẩm thành công",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Lỗi máy chủ",
    });
  }
};

// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    // Kiểm tra nếu các trường bắt buộc bị thiếu
    if (!name || !description || !price || !image) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Vui lòng điền đầy đủ thông tin sản phẩm",
        data: null,
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
    });

    // Lưu sản phẩm vào database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: "Sản phẩm đã được thêm thành công",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Lỗi server",
      data: null,
    });
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Lấy chi tiết sản phẩm thành công",
      data: {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      },
    });
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Lỗi máy chủ",
    });
  }
};
// Sửa sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, image } = req.body;

    // Kiểm tra nếu các trường bắt buộc bị thiếu
    if (!name || !description || !price || !image) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin sản phẩm" });
    }

    // Tìm và cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, image },
      { new: true } // `new: true` để trả về sản phẩm sau khi được cập nhật
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Cập nhật sản phẩm thành công",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Lỗi máy chủ",
    });
  }
};
// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Tìm và xóa sản phẩm
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Không tìm thấy sản phẩm để xóa",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Lỗi máy chủ",
    });
  }
};
