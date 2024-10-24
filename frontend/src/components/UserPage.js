import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products'); // Adjust the endpoint as needed
                setProducts(response.data);
            } catch (err) {
                setError(err.response ? err.response.data : 'Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Welcome to Your User Page</h1>
            <h2>Shop Our Products</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div className="product-card" key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <img src={product.imageUrl} alt={product.name} /> {/* Assuming products have an imageUrl field */}
                        <button>Add to Cart</button> {/* Placeholder for add to cart functionality */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPage;
