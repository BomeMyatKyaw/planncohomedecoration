import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBoxOpen, faShoppingCart, faSpinner, faStar, faTag } from '@fortawesome/free-solid-svg-icons';

import banner4 from '../assets/img/banner/banner4.jpg';
// import { data } from "jquery";

const FurnitureDetailPage = ()=>{
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [item,setItem] = useState(null);
    const [loading,setLoading] = useState(true);
    const [added,setAdded] = useState(false);
    const [selectedImage,setSelectedImage] = useState(null);

    useEffect(()=>{

        axios.get(`https://dummyjson.com/products/${id}`)
        .then(res=>{
            // console.log(res.data);
            
            setItem(res.data);
            setLoading(false);
            setSelectedImage(res.data.thumbnail || res.data.images?.[0]) // default image (image gallery)

            // console.log(item); // null

            // check if product already exists in localStorage
            const getcarts = JSON.parse(localStorage.getItem("cart")) || [];
            const exists = getcarts.find(getcart => getcart.id == res.data.id);

            if(exists){
                setAdded(true);
            }

        }).catch(err=>{
            console.error(`Error fetching product : ${err}`);
            setLoading(false);
        })

    },[id]);

    const addToCartHandler = ()=>{

        const cartdatas = JSON.parse(localStorage.getItem("cart")) || [];
        const exists = cartdatas.find(cartdata => cartdata.id == item.id);

        if(!exists){
            
            // method 1 : all datas + qty
            // cartdatas.push({...item,qty:1});
            // localStorage.setItem("cart",JSON.stringify(cartdatas));

            // method 2 : select only necessary fields to store in cart
            const cartitem = {
                thumbnail:item.thumbnail || item.images?.[0],
                id:item.id,
                title:item.title,
                description:item.description,
                price:item.price,
                qty:1,
            }

            cartdatas.push(cartitem);
            localStorage.setItem("cart",JSON.stringify(cartdatas));
        }

        setAdded(true);

    }

    if(loading){
        return (
            <div className="text-center py-5">
                <FontAwesomeIcon icon={faSpinner} spin className="text-warning" />
                <p className="mt-2">Loading product...</p>
            </div>
        )
    }

    if(!item){

        return <p className="text-center text-danger">Product not found</p>
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

                {/* products cards */}
                <div className="row g-4">
                    
                    {/* product image gallery */}
                    <div className="col-md-6 text-center">

                        <div className="card shadow-sm p-3">
                            {/* <img src={item.thumbnail || item.images?.[0]} className="img-fluid rounded" style={{ maxHeight:"400px",objectFit:"contain" }} alt={item.title} /> */}
                            <img src={selectedImage} className="img-fluid rounded" style={{ maxHeight:"400px",objectFit:"contain" }} alt={item.title} />
                        </div>

                        <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
                            {
                                item.images?.map((img,index)=>(
                                    <img key={index} src={img} className={`img-thumbnail ${selectedImage === img ? "border border-primary" : "" }`} style={{ width:"80px",height:"80px",objectFit:"cover",cursor:"pointer" }} alt={`${item.title}-${index}`} onClick={()=>setSelectedImage(img)} />
                                ))
                            }
                        </div>

                    </div>

                    {/* product info */}
                    <div className="col-md-6">
                        <h2>{item.title}</h2>
                        <p className="text-muted">{item.description}</p>

                        <h4 className="text-success">
                            <FontAwesomeIcon icon={faTag} className="me-2" />
                            {item.price}
                        </h4>

                        <p>
                            <FontAwesomeIcon icon={faStar} className="text-warning me-2" />
                            <strong>{item.rating}</strong>/5
                        </p>

                        <p>
                            <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
                            Stock: <span className={item.stock > 0 ? "text-success fw-bold":"text-danger fw-bold"}>{item.stock > 0 ? `${item.stock} avaliable` : "Out of Stock"}</span> 
                        </p>

                        <div className="d-flex gap-2 mt-3">
                            <button type="button" className="btn btn-dark" onClick={addToCartHandler} disabled={added}>{added ? "Added to Cart" : "Add to Cart"}</button>
                            
                            {added && (
                                <button type="button" className="btn btn-outline-primary" onClick={()=>navigate("/carts")}>
                                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />Go to Cart
                                </button>
                            )}
                        </div>

                    </div>

                </div>

                {/* Relative Info */}
                <div>
                    <h4>Product Details</h4>
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Brand : </strong>{item.brand}</li>
                        <li className="list-group-item"><strong>Category : </strong>{item.category}</li>
                        <li className="list-group-item"><strong>Discount : </strong>{item.discountPercentage}% off</li>
                    </ul>
                </div>

            </section>

        </main>
    )
};

export default FurnitureDetailPage;