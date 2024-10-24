import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminProductPage.css'; // Your CSS file for styling

const AdminProductPage = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null  // This will hold the image file
    });
    const [editingProductId, setEditingProductId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data); // Set the fetched products to state
            } catch (error) {
                console.error('Error fetching products:', error.response ? error.response.data : error.message);
            }
        };

        fetchProducts();
    }, []);

    // Handle form submit for adding or updating products
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');  // Clear any previous errors

        // Frontend validation to ensure required fields are not empty
        if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.image) {
            setErrorMessage('Please fill in all the fields, including an image.');
            return;
        }

        // Create FormData object for file upload
        const productData = new FormData();
        productData.append('name', formData.name);
        productData.append('description', formData.description);
        productData.append('price', formData.price);
        productData.append('category', formData.category);
        productData.append('image', formData.image); // append the image file

        try {
            if (editingProductId) {
                // Update existing product
                await axios.put(`http://localhost:5000/api/products/${editingProductId}`, productData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setProducts(products.map((product) =>
                    product._id === editingProductId ? { ...product, ...formData } : product
                ));
                setEditingProductId(null);
            } else {
                // Add new product
                const response = await axios.post('http://localhost:5000/api/products', productData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setProducts([...products, response.data.product]);
            }
            setFormData({ name: '', description: '', price: '', category: '', image: null });
        } catch (error) {
            console.error('Error adding/updating product:', error.response ? error.response.data : error.message);
            setErrorMessage(error.response ? error.response.data.message : 'Error adding/updating product.');
        }
    };

    // Edit product function
    const handleEdit = (product) => {
        setEditingProductId(product._id);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(), // Ensure price is a string to handle input correctly
            category: product.category,
            image: null  // You would need to upload a new image when editing
        });
    };

    // Delete product function
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                setProducts(products.filter((product) => product._id !== id));
            } catch (error) {
                console.error('Error deleting product:', error.response ? error.response.data : error.message);
            }
        }
    };

    return (
        <div className="admin-product-page container">
            <h2>Manage Products</h2>

            {/* Error Message */}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            {/* Form to add or edit products */}
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="form-control mb-2"
                />
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="form-control mb-2"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="form-control mb-2"
                />
                <input
                    type="file"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    required
                    className="form-control mb-2"
                />
                <button type="submit" className="btn btn-primary">
                    {editingProductId ? 'Update Product' : 'Add Product'}
                </button>
            </form>

            {/* Display list of products */}
            <div className="product-list">
                <h3>Product List</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.category}</td>
                                <td>
                                    <img src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} className="img-thumbnail" style={{ width: '50px' }} />
                                </td>
                                <td>
                                    <button onClick={() => handleEdit(product)} className="btn btn-warning me-2">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(product._id)} className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProductPage;
                    