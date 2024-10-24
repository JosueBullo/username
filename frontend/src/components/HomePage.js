// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './HomePage.css'; // Create and import the CSS file for styling
import { FaShoppingCart, FaUser, FaSignInAlt } from 'react-icons/fa'; // Import icons

const HomePage = () => {
    return (
        <div className="home-container container mt-5">
            <header className="home-header text-center mb-4">
                <h1>Welcome to Extreme Sportsware</h1>
                <p>Your one-stop shop for extreme sports equipment!</p>
            </header>
            <main className="home-content">
                <section className="featured-products mb-5">
                    <h2 className="text-center">Featured Products</h2>
                    <div className="row">
                        {/* Example of product cards, replace with actual product data */}
                        <div className="col-md-4 mb-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Product 1</h5>
                                    <p className="card-text">Description of Product 1</p>
                                    <p className="card-text">$49.99</p>
                                    <Link to="/products/1" className="btn btn-primary">View Product</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Product 2</h5>
                                    <p className="card-text">Description of Product 2</p>
                                    <p className="card-text">$59.99</p>
                                    <Link to="/products/2" className="btn btn-primary">View Product</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Product 3</h5>
                                    <p className="card-text">Description of Product 3</p>
                                    <p className="card-text">$69.99</p>
                                    <Link to="/products/3" className="btn btn-primary">View Product</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="about mb-5 text-center">
                    <h2>About Us</h2>
                    <p>We provide high-quality gear for all your extreme sports needs.</p>
                </section>
            </main>
            <footer className="home-footer text-center mt-5">
                <p>&copy; 2024 Extreme Sportsware</p>
                <div className="auth-links">
                    <Link to="/login" className="btn btn-secondary me-2">
                        <FaSignInAlt className="me-1" /> Login
                    </Link>
                    <Link to="/register" className="btn btn-secondary">
                        <FaUser className="me-1" /> Register
                    </Link>
                    <Link to="/cart" className="btn btn-secondary ms-2">
                        <FaShoppingCart className="me-1" /> Cart
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
