import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import user1 from "../assets/img/users/user1.jpg"
import user2 from "../assets/img/users/user2.jpg"
import user3 from "../assets/img/users/user3.jpg"

const Customers = ()=>{
    return(
        <>
            {/* Start Customers Section */}
            <section className="py-3 customers">
                <div className="container-fluid">

                    {/* Start title */}

                    <div className="text-center">
                        <div className="col">
                            <h3 className="titles">What Customers Says?</h3>
                        </div>
                    </div>

                    {/* End title */}

                    <div className="row">
                        <div className="col-md-6 mx-auto">

                            <div id="customercarousels" className="carousel slides" data-bs-ride="carousel">
                                
                                <ol className="carousel-indicators">
                                    <li className="active" data-bs-target="#customercarousels" data-bs-slide-to="0"></li>
                                    <li data-bs-target="#customercarousels" data-bs-slide-to="1"></li>
                                    <li data-bs-target="#customercarousels" data-bs-slide-to="2"></li>
                                </ol>

                                <div className="carousel-inner">

                                    <div className="carousel-item text-center active">
                                        <img src={user1} className="rounded-circle" alt="user1" />
                                        <blockquote className="text-white">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                        </blockquote>
                                        <h5 className="text-light text-uppercase fw-bold mb-3">Ms.July</h5>
                                        <ul className="list-inline mb-5">
                                            {
                                                [...Array(5)].map((_,x)=>(
                                                    <li key={x} className="list-inline-item">
                                                        <FontAwesomeIcon icon="fa-solid fa-star" className="text-warning" />
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    <div className="carousel-item text-center">
                                        <img src={user2} className="rounded-circle" alt="user2" />
                                        <blockquote className="text-white">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                        </blockquote>
                                        <h5 className="text-light text-uppercase fw-bold mb-3">Mr.Anton</h5>
                                        <ul className="list-inline mb-5">
                                            {
                                                [...Array(5)].map((_,x)=>(
                                                    <li key={x} className="list-inline-item">
                                                        <FontAwesomeIcon icon="fa-solid fa-star" className="text-warning" />
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    <div className="carousel-item text-center">
                                        <img src={user3} className="rounded-circle" alt="user3" />
                                        <blockquote className="text-white">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                        </blockquote>
                                        <h5 className="text-light text-uppercase fw-bold mb-3">Ms.Yoon</h5>
                                        <ul className="list-inline mb-5">
                                            {
                                                [...Array(4)].map((_,x)=>(
                                                    <li key={x} className="list-inline-item">
                                                        <FontAwesomeIcon icon="fa-solid fa-star" className="text-warning" />
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
            {/* End Customers Section */}
        </>
    )
};

export default Customers;