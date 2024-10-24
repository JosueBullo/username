import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; // Import HomePage component
import AdminLayout from './components/AdminLayout'; // Import AdminLayout for admin routes
import AdminPage from './components/AdminPage'; // Import AdminPage for admin overview
import AdminProductPage from './components/AdminProductPage'; // Import AdminProductPage for managing products
import Register from './components/Register'; // Import Register component
import Login from './components/Login'; // Import Login component
import UserPage from './components/UserPage'; // Import UserPage component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} /> {/* Set HomePage as the default route */}
                <Route path="/admin/*" element={<AdminLayout />}> {/* Admin layout for nested routes */}
                    <Route path="" element={<AdminPage />} /> {/* Admin main page */}
                    <Route path="products" element={<AdminProductPage />} /> {/* Manage products page */}
                    {/* Add other admin routes here */}
                </Route>
                <Route path="/register" element={<Register />} /> {/* Register route */}
                <Route path="/login" element={<Login />} /> {/* Login route */}
                <Route path="/user" element={<UserPage />} /> {/* User page route */}
            </Routes>
        </Router>
    );
};

export default App;
