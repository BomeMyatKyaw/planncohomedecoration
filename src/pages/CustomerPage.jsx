import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router'

import { fetchCustomers, toggleFavourite } from "../store/customerSlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTriangleExclamation, faStar, faCircleCheck, faHeart } from '@fortawesome/free-solid-svg-icons'

import banner4 from '../assets/img/banner/banner4.jpg';

const PAGESIZE = 6

const CustomerPage = () => {

    const { loading, error, datas } = useSelector(state => state.customers);

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCustomers({limit:30}));
    }, [dispatch]);

    // method 1
    // const getFilteredCustomers = ()=>{

    //     const getqtext = query.trim().toLowerCase();

    //     if (!getqtext) return datas;

    //     return datas.filter(data =>
    //         data.name.toLowerCase().includes(getqtext) ||
    //         data.company.toLowerCase().includes(getqtext) ||
    //         data.city.toLowerCase().includes(getqtext)
    //     );

    // }

    // const filtered = getFilteredCustomers(); // 30/6 = 5 pages

    // method 2 (for speedup ui = useMemo())
    const filtered = useMemo(()=>{

        const getqtext = query.trim().toLowerCase();

        if(!getqtext) return datas;

        return datas.filter(data=>
            data.name.toLowerCase().includes(getqtext) ||
            data.company.toLowerCase().includes(getqtext) ||
            data.city.toLowerCase().includes(getqtext)
        );

    },[datas,query]);
    

    const totalPages = Math.max(1, Math.ceil((filtered.length / PAGESIZE))); // atleast 1 page
    const pageItems = filtered.slice((page - 1) * PAGESIZE, page * PAGESIZE);
    
    // [a,b,c,d,e,f,g,h,i,j,k,l]
    //  0 1 2 3 4 5 6 7 8 9 10 11

    // page 1 = 0 to 5 a to f
    // page 2 = 6 to 11 g to l

    // slice(0,6) = 0,1,2,3,4,5
    // slice(6,12) = 6,7,8,9,10,11

    // 1-1 * 6 , 1 * 6
    // 0       , 6

    // 2-1 * 6 , 2 * 6
    // 6       , 12

    useEffect(()=>{
        
        // const result = [...Array(5)];
        // console.log(result); // [undefined,undefined,undefined,undefined,undefined]
        // console.log(result.length) // 5

        // if filtered changes and current page is out of range! reset to 1
        if(page > totalPages) setPage(1);
    },[page,totalPages]);

    const searchHandler = (e) => {
        setQuery(e.target.value);
    }

    return (
        <main className="bg-black text-light">

            {/* Banner*/}
            <section className="text-center d-flex justify-content-center align-items-center" style={{
                minHeight: "70vh",
                backgroundImage: `url(${banner4})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}>
                <div className="container bg-dark bg-opacity-50 rounded py-5">
                    <h1 className="display-6">Our Customers</h1>
                    <p className="lead">Real feedback from real people. We're proud to earn their trust.</p>

                    {/* search box */}
                    <div className="mx-auto mt-3 style={{ maxWidth:560 }}">
                        <input type="text" className="form-control form-control-lg" placeholder="Search customers by name, description or category..." value={query} onChange={searchHandler} />
                    </div>

                </div>
            </section>

            <section className="container py-5">

                {/* loading */}
                {loading && (
                    <div className="text-center">
                        <FontAwesomeIcon icon={faSpinner} spin className="text-warning" />
                        <p className="mt-2">Loading customers...</p>
                    </div>
                )}

                {/* error */}
                {error && (
                    <div className="alert alert-danger text-center">
                        <FontAwesomeIcon icon={faTriangleExclamation} className="me-2" />
                        {error}
                    </div>
                )}

                {!loading && !error && (

                    <>
                        {/* status cards */}
                        <div className="row g-3 mb-3">

                            <div className="col-md-4">
                                <div className="h-100 bg-secondary text-center p-3">
                                    <h6 className="opacity-5 mb-1">Total Customers</h6>
                                    <div className="display-6 fw-bold">{filtered.length}</div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="h-100 bg-secondary text-center p-3">
                                    <h6 className="opacity-5 mb-1">Avg. Rating</h6>
                                    <div className="display-6 fw-bold">{filtered.length ? (filtered.reduce((start,end)=>start+end.rating,0) / filtered.length).toFixed(1) : 0} <FontAwesomeIcon icon={faStar} className="text-warning ms-1" /></div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="h-100 bg-secondary text-center p-3">
                                    <h6 className="opacity-5 mb-1">Verified</h6>
                                    <div className="display-6 fw-bold"><FontAwesomeIcon icon={faCircleCheck} className="text-info me-1" /> {Math.ceil(filtered.length * 0.8)}+</div>
                                </div>
                            </div>

                        </div>


                        {/* cards */}
                        <div className="row g-4">

                            {pageItems.map((pageItem)=>(
                                <div className="col-md-4 col-sm-6" key={pageItem.id}>
                                    <div className="card h-100 border-0">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <img src={pageItem.avatar} className="rounded-circle border me-3" width="55" height="55" style={{ objectFit: "cover" }} alt={pageItem.name} />
                                                <div>
                                                    <h6 className="text-dark mb-0">{pageItem.name}</h6>
                                                    <small className="text-muted">
                                                        {pageItem.title} @ {pageItem.company}
                                                    </small>
                                                    <div className="small text-muted">{pageItem.city}</div>
                                                </div>
                                                <button className={`btn btn-sm ms-auto ${ pageItem.favourite ? "btn-danger" : "btn-outline-danger" }`} title={ pageItem.favourite ? "Unfavourite" : "Favourite" } onClick={ ()=>dispatch(toggleFavourite(pageItem.id)) }>
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </button>
                                            </div>

                                            <p className="text-muted mt-3 mb-2" style={{ minHeight: 60 }}>
                                                {pageItem.review}
                                            </p>

                                            <div className="mt-auto">
                                                {
                                                    // Array.from({length:5}).map((_,idx)=>(
                                                    //     <FontAwesomeIcon icon={faStar} className={idx < pageItem.rating ? "text-warning me-1" : "text-secondary me-1"} />
                                                    // ))

                                                    [...Array(5)].map((_,idx)=>(
                                                        <FontAwesomeIcon icon={faStar} className={idx < pageItem.rating ? "text-warning me-1" : "text-secondary me-1"} />
                                                    ))
                                                }      
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {!pageItems.length && (
                                <div className="text-center py-5">No customers found.</div>
                            )}

                        </div>

                        {/* pagination */}
                        {
                            totalPages > 1 && (
                                <nav className="mt-4">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                            <button className="page-link" onClick={()=>setPage((curpage)=>Math.max(1,curpage-1))}>Prev</button>
                                        </li>
                                        {
                                            Array.from({length:totalPages}).map((_,idx)=>(
                                                <li className={`page-item ${page === idx+1 ? "active" : ""} `} key={idx}>
                                                    <button className="page-link" onClick={()=>setPage(idx+1)}>{idx+1}</button>
                                                </li>
                                            ))
                                        }
                                        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                                            <button className="page-link" onClick={()=>setPage((curpage)=>Math.min(totalPages,curpage+1))}>Next</button>
                                        </li>
                                    </ul>
                                </nav>
                            )
                        }        
                    </>
                    
                )}

                {/* cards */}
                

            </section>

        </main>
    )
};

export default CustomerPage;