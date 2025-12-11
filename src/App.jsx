import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Navbar from './components/NavBar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PropertyPage from './pages/PropertyPage';
import ServicePage from './pages/ServicePage.jsx';
import CustomerPage from './pages/CustomerPage.jsx';

import FurniturePage from './pages/FurniturePage.jsx';
import FurnitureDetailPage from './pages/FurnitureDetailPage.jsx';
import CartPage from  './pages/CartPage.jsx';

import ContactPage from './pages/ContactPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';


function App() {

    return (
        <div className='App'>
            <Navbar />
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/aboutus' element={<AboutPage/>} />
                <Route path='/properties' element={<PropertyPage/>} />
                <Route path='/services' element={<ServicePage/>} />
                <Route path='/customers' element={<CustomerPage/>} />

                <Route path='/furnitures' element={<FurniturePage/>} />
                <Route path='/furnitures/:id' element={<FurnitureDetailPage />} />
                <Route path='/carts' element={<CartPage />} />

                <Route path='/contacts' element={<ContactPage/>} />
                <Route path='/checkout' element={<CheckoutPage/>} />
                <Route path='/order-success' element={<OrderSuccess />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App