// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const multer = require('multer'); // Import multer for file uploads
const path = require('path');


// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes'); // Ensure the path is correct
const productController = require('./controllers/productController'); // Import your product controller

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Define your upload folder

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the process with a failure
});
// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Set up authentication routes
app.use('/api/auth', authRoutes); 

// Set up product routes
app.use('/api/products', productRoutes); 

// Define the route for creating products with image upload
app.post('/api/products', upload.single('image'), productController.createProduct);

// Test route
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

// Set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
