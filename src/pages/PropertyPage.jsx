import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router'

import { fetchProperties } from "../store/propertySlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTriangleExclamation, faStar, faCircleCheck, faMapMarkedAlt, faBed, faBath, faRulerCombined } from '@fortawesome/free-solid-svg-icons'

import banner4 from '../assets/img/banner/banner4.jpg';

const PAGESIZE = 6

const PropertyPage = () => {

    const { loading, error, datas } = useSelector(state => state.properties);

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProperties({limit:30}));
    }, [dispatch]);

    // method 1
    const cities = ["all","Yangon","Mandalay","PwinOoLwin","Taunggyi","Bago","Myawlamyine"];
    const statuses = ["all","For Sale","For Rent", "Sold Out"];

    const formatUSD = (price)=>
        new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD"
    }).format(price || 0);

    

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
                    <h1 className="display-6">Find Your Next Home</h1>
                    <p className="lead">Real feedback from real people. We're proud to earn their trust.</p>

                    {/* search box */}
                    <div className="mx-auto mt-3 style={{ maxWidth:880 }}">
                        <div className="row g-2">

                            <div className="col-md-5">
                                <input type="text" name="query" className="form-control form-control-lg" placeholder="Search by title, city or description..." value={query} />
                            </div>

                            <div className="col-md-2">
                                <select name="city" className="form-select form-select-lg">
                                    {cities.map((city,idx)=>(
                                        <option key={idx} value={city}>{city === "all" ? "All Cities" : city}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-2">
                                <select name="status" className="form-select form-select-lg">
                                    {statuses.map((status,idx)=>(
                                        <option key={idx} value={status}>{status === "all" ? "All Statuses" : status}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-3 d-flex gap-2">
                                <input type="number" name="minprice" className="form-control form-control-lg" min="0" placeholder="Min $" value={query} />
                                <input type="number" name="maxprice" className="form-control form-control-lg" maxLength="0" placeholder="Max $" value={query} />
                            </div>

                            <div className="text-end mt-2">
                                <button className="btn btn-outline-light btn-sm">Reset Filter</button>
                            </div>

                        </div>
                        
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
                                    <h6 className="opacity-5 mb-1">Matching Properties</h6>
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
                                    <h6 className="opacity-5 mb-1">Cities Covered</h6>
                                    <div className="display-6 fw-bold"><FontAwesomeIcon icon={faCircleCheck} className="text-info me-1" /> {Math.ceil(filtered.length * 0.8)}+</div>
                                </div>
                            </div>

                        </div>


                        {/* cards */}
                        <div className="row g-4">

                            {pageItems.map((pageItem)=>(
                                <div className="col-md-3 col-sm-6" key={pageItem.id}>
                                    <div className="card h-100 border-0">

                                        <div className="position-relative">
                                            <img src={pageItem.thumbnail} className="card-img-top" style={{ height:150, objectFit: "cover" }} alt={pageItem.name} />
                                            <span className={`badge ${
                                                    pageItem.status === "Sold Out" ? "bg-danger" : pageItem.status === "For Rent" ? "bg-info" : "bg-success" 
                                                } position-absolute top-0 start-0 m-2`}>{pageItem.status}</span>
                                            <span className="badge bg-dark position-absolute bottom-0 end-0 m-2">{formatUSD(pageItem.price)}</span>
                                        </div>

                                        <div className="card-body">
          
                                            <h6 className="text-dark mb-0">{pageItem.title}</h6>
                                            <div>
                                                <small className="text-muted mb-2">
                                                    <FontAwesomeIcon icon={faMapMarkedAlt} className="me-1" />
                                                    {pageItem.name}
                                                </small>
                                            </div>

                                            <div className="d-flex gap-3 small text-muted">
                                                <span><FontAwesomeIcon icon={faBed} className="me-1" />{pageItem.beds} bd</span>
                                                <span><FontAwesomeIcon icon={faBath} className="me-1" />{pageItem.baths} ba</span>
                                                <span><FontAwesomeIcon icon={faRulerCombined} className="me-1" />{pageItem.area} sqft</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}

                            {!pageItems.length && (
                                <div className="text-center py-5">No properties found.</div>
                            )}

                        </div>

                        {/* pagination */}
                        {

                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small px-3 py-2 border-top mt-4">
                                {/* left side info */}
                                <div className="mb-2 mb-md-0">
                                    Page <strong>{page}</strong> of <strong>{totalPages}</strong> Total <strong></strong> properties
                                </div>

                                {/* pagination btn */}
                                    <nav className="mt-4">
                                        <ul className="pagination pagination-sm mb-1">
                                            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                                <button className="page-link" onClick={()=>setPage((curpage)=>Math.max(1,curpage-1))}>Prev</button>
                                            </li>
                                            {/* page indicator */}
                                            <li className="page-item disabled">
                                                <span className="page-link">{page} / {totalPages}</span>
                                            </li>
                                            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                                                <button className="page-link" onClick={()=>setPage((curpage)=>Math.min(totalPages,curpage+1))}>Next</button>
                                            </li>
                                        </ul>
                                    </nav>
                            </div>


                            
                        }        
                    </>
                    
                )}

                {/* cards */}
                

            </section>

        </main>
    )
};

export default PropertyPage;