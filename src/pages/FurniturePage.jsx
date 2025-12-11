import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router'

import { fetchFurnitures } from "../store/furnitureSlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTriangleExclamation, faSearch, faTag, faTimes } from '@fortawesome/free-solid-svg-icons'

import banner4 from '../assets/img/banner/banner4.jpg';

const FurniturePage = () => {

    const { loading, error, datas } = useSelector(state => state.furnitures);

    const [searchItem, setSearchItem] = useState("");
    const [filterDatas, setFilterData] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFurnitures());
    }, [dispatch]);

    useEffect(() => {

        // console.log(datas);

        if (datas && datas.length > 0) {

            const filtered = datas.filter(data =>
                data.title.toLowerCase().includes(searchItem.toLowerCase()) ||
                data.description.toLowerCase().includes(searchItem.toLowerCase()) ||
                data.category.toLowerCase().includes(searchItem.toLowerCase())

            );

            setFilterData(filtered);
        }

    }, [searchItem, datas]);

    const searchHandler = (e) => {
        setSearchItem(e.target.value);
    }

    const clearHandler = () => {
        setSearchItem("");
    }

    const displaydatas = searchItem ? filterDatas : datas;

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
                <div className="container bg-dark bg-opacity-50 rounded">
                    <h1 className="display-6">Furniture Collections</h1>
                    <p className="lead">Discover modern,stylish, and comfortable furniture for your home.</p>
                </div>
            </section>

            <section className="container py-5">

                <div className="text-center mb-5">
                    <h3 className="fw-bold mb-4">Avaliable Products</h3>
                </div>

                {/* search box */}
                <div className="row justify-content-center mb-3">
                    <div className="col-md-6">

                        <div className="input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                            <input type="text" className="form-control" style={{ outline: "none", boxShadow: "none" }} placeholder="Search furniture by name, description or category..." value={searchItem} onChange={searchHandler} />
                            {searchItem && (<button type="button" className="input-group-text" onClick={clearHandler}><FontAwesomeIcon icon={faTimes} /></button>)}
                        </div>

                        {/* search results count */}
                        {searchItem && (
                            <div className="text-light small mt-2">Found {filterDatas.length} product{filterDatas.length !== 1 ? 's' : ''} {searchItem && ` for "${searchItem}"`}</div>
                        )}

                    </div>
                </div>

                {/* loading */}
                {loading && (
                    <div className="text-center">
                        <FontAwesomeIcon icon={faSpinner} spin className="text-warning" />
                        <p className="mt-2">Loading furniture...</p>
                    </div>
                )}

                {/* error */}
                {error && (
                    <div className="alert alert-danger text-center">
                        <FontAwesomeIcon icon={faTriangleExclamation} className="me-2" />
                        {error}
                    </div>
                )}

                {/* products cards */}
                <div className="row g-4">
                    {
                        !loading && !error &&
                        displaydatas.map((data) => (
                            <div className="col-lg-3 col-md-4" key={data.id}>
                                <div className="card h-100">
                                    <img src={data.thumbnail || data.images?.[0]} className="card-img-top p-3" alt={data.title} style={{ height: "200px", objectFit: "contain" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{data.title}</h5>
                                        <p className="card-text text-muted small">
                                            {data.description.substring(0, 80)}...
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <span className="fw-bold text-success">
                                                <FontAwesomeIcon icon={faTag} className="me-1" />
                                                {data.price}
                                            </span>
                                            <Link to={`/furnitures/${data.id}`} className="btn btn-sm btn-dark">View</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </section>

        </main>
    )
};

export default FurniturePage;