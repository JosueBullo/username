/*const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Update a product
router.put('/:id', productController.updateProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;*/
const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set up multer for file uploads

// Define routes
router.post('/', upload.single('image'), createProduct); // Correct POST route with file upload middleware
router.get('/', getAllProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;


