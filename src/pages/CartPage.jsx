import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingCart, faTag, faTrash } from '@fortawesome/free-solid-svg-icons';

import banner4 from '../assets/img/banner/banner4.jpg';

const CartPage = ()=>{
    
    const navigate = useNavigate();
    const [carts,setCarts] = useState([]);
    // const [loading,setLoading] = useState(true);

    useEffect(()=>{

        const getcarts = JSON.parse(localStorage.getItem("cart")) || [];
        setCarts(getcarts);

    },[]);

    const qtychangeHandler = (productid,delta)=>{

        const updatecart = carts.map(cart=>(cart.id === productid ? {...cart,qty:(cart.qty || 1)+delta} : cart));

        setCarts(updatecart);
        localStorage.setItem("cart",JSON.stringify(updatecart));

    }

    const removeHandler = (productid)=>{
        const updatecart = carts.filter(cart => cart.id !== productid);
        setCarts(updatecart);
        localStorage.setItem("cart",JSON.stringify(updatecart));
    };

    const clearHandler = ()=>{
        setCarts([]);
        localStorage.removeItem("cart");
    };

    const total = carts.reduce((prev,next)=>prev+next.price * (next.qty || 1),0);

    if(carts.length === 0){
        return (
            <div className="container text-center py-5">
                <h4>Your cart is empty</h4>
                <button type="button" className="btn btn-outline-secondary mb-4" onClick={()=>navigate("/furnitures")}><FontAwesomeIcon icon={faArrowLeft} /> Back to Shop</button>
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

            <section className="container py-5">

                
                <button type="button" className="btn btn-outline-secondary mb-4" onClick={()=>navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4><FontAwesomeIcon icon={faShoppingCart} className="me-2" /> Your Cart</h4>
                    <button type="button" className="btn btn-danger btn-sm" onClick={clearHandler}>Clear Cart</button>
                </div>

                {/* products cards */}
                <div className="row g-4">

                    {
                        carts.map(cart=>(
                            <div key={cart.id} className="col-lg-4 col-md-6 text-center">

                                <div className="card h-100 shadow-sm">
                                    <img src={cart.thumbnail || cart.images?.[0]} className="card-img-top p-3" style={{ height:"200px",objectFit:"contain" }} alt="" />
                                

                                    <div className="card-body d-flex flex-column">
                                        <span className="card-title">{cart.title}</span>
                                        <span className="card-muted small">{cart.description?.substring(0,70)}...</span>

                                        <div className="d-flex justify-content-between mt-auto">
                                            
                                            <span className="fw-bold text-success">
                                                <FontAwesomeIcon icon={faTag} className="me-1" />${cart.price}
                                            </span>
                                            
                                            {/* Qty Control */}
                                            <div className="d-flex align-items-center mt-2">
                                                <button type="button" className="btn btn-sm btn-outline-dark rounded-circle d-flex justify-content-center align-items-center" style={{ width:"20px",height:"20px" }} onClick={()=>qtychangeHandler(cart.id,-1)}> - </button>
                                                <small className="fw-bold mx-2">Qty: {cart.qty}</small>
                                                <button type="button" className="btn btn-sm btn-outline-dark rounded-circle d-flex justify-content-center align-items-center" style={{ width:"20px",height:"20px" }} onClick={()=>qtychangeHandler(cart.id,1)}> + </button>
                                            </div>

                                            <button className="btn btn-sm btn-outline-danger" onClick={()=>removeHandler(cart.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                        </div>
                                        
                                    </div>

                                </div>

                            </div>
                        ))
                    }
                    
                    


                </div>

                {/* Cart Total */}
                <div className="bg-light rounded shadow-sm p-4 mt-5">
                    <h4>Total : <span className="text-success">${total.toFixed(2)}</span></h4>
                    <button type="button" className="btn btn-dark m-3" onClick={()=>navigate("/checkout")}>Proceed to Checkout</button>
                </div>

            </section>

        </main>
    )
};

export default CartPage;