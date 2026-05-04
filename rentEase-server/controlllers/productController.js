const Product = require('../models/Product'); // Jo schema humne discuss kiya tha

// Saare products fetch karne ke liye (ya category wise filter karne ke liye)
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Single product details ke liye
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Invalid ID", error });
  }
};