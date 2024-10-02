const express = require("express");
const {
  getProducts,
  addProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", getProducts);

router.post("/", addProduct);

router.get("/:id", getProductDetail);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
