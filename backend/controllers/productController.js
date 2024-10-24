// controllers/productController.js
const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, category } = req.body; // Destructure from req.body
  let imageUrl;

  // Check if a file was uploaded
  if (req.file) {
    // If there's a file, construct the imageUrl
    imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  } else {
    // Handle the case where no file is uploaded
    return res.status(400).json({ message: 'Image file is required' });
  }

  try {
    // Create a new product
    const newProduct = new Product({ name, description, price, category, imageUrl });
    await newProduct.save(); // Save the new product to the database

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error in creating product:', error); // Log the error
    res.status(500).json({ message: 'Server error', error });
  }
};



// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetching all products
    res.json(products); // Sending the products as a response
  } catch (error) {
    res.status(400).json({ message: 'Server error', error });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, imageUrl } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, category, imageUrl }, { new: true });
    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
