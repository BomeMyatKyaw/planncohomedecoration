import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import banner4 from '../assets/img/banner/banner4.jpg';

const OrderSuccess = ()=>{
    
    const navigate = useNavigate();
    const {state} = useLocation();
    const orderData = state?.orderData;

    useEffect(()=>{

        // console.log("State : ",state);
        // console.log("Order Date : ",state.orderData);
        // console.log(orderData);

    },[]);

    if(!orderData){
        // if someone visits / order-success directly
        return(
            <div className="container text-center py-5">
                <h2>No Order Found</h2>
                <button className="btn btn-dark mt-3" onClick={()=>navigate('/')}>Go Home</button>
            </div>
        )
    }

    return(
        <main className="bg-light">

            {/* Banner*/}
            <section className="text-center text-white d-flex justify-content-center align-items-center" style={{ 
                minHeight:"70vh",
                backgroundImage:`url(${banner4})`,
                backgroundSize:"cover",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
            }}>
                <div className="container bg-dark bg-opacity-50 rounded">
                    <h1 className="display-6">Furniture Collections</h1>
                    <p className="lead">Discover modern,stylish, and comfortable furniture for your home.</p>
                </div>
            </section>

            <section className="container text-center py-5">

                <FontAwesomeIcon icon={faCheckCircle} size="4x" className="text-success mb-3" />
                <h2 className="fw-bold">Thank You</h2>
                <p className="load">Your order has been placed successfully.</p>

                {/* Order Info */}
                <div className="card shadow-sm p-4 my-3">
                    <h5>Order Summary</h5>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Order Id</span>
                            <strong>{ orderData.orderId }</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Payment</span>
                            <strong>{ orderData.paymentmethod }</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total Paid (inc. tax+ship)</span>
                            <strong>$ { orderData.grandtotal.toFixed(2) }</strong>
                        </li>
                    </ul>
                </div>

                {/* Items List */}
                <div className="card shadow-sm p-4 my-3">
                    <h5>Items Ordered</h5>
                    <ul className="list-group">

                        {orderData.items.map((order,idx)=>(
                            <li key={idx} className="list-group-item d-flex justify-content-between">
                                <span>{ order.title } x { order.qty }</span>
                                <strong>$ { (order.price).toFixed(2) }</strong>
                            </li>
                        ))}

                        
                    </ul>
                </div>

                {/* Buttons */}
                <div className="">
                    <button type="button" className="btn btn-outline-secondary" onClick={()=>navigate('/furnitures')}>
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />Continue Shopping
                    </button>
                </div>

            </section>

        </main>
    )
};

export default OrderSuccess;