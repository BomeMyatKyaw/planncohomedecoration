import React,{useEffect,useState} from "react";
import { Link } from "react-router"

import favicon from "../assets/img/fav/favicon.png"

const NavBar = ()=>{

    const [scrolled,setScrolled] = useState(false);

    useEffect(()=>{

        const scrollHandler = ()=>{
            const getscrolltop = window.scrollY || document.documentElement.scrollTop;
            // console.log(getscrolltop);

            setScrolled(getscrolltop >= 200);
        }

        window.addEventListener("scroll",scrollHandler);

        // clean up the event listener when component unmounts
        return ()=>window.removeEventListener("scroll",scrollHandler);

    },[scrolled]);

    return(
        <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navmenus' : ''}`}>

            <Link to="/" className="navbar-brand text-light mx-3">
                <img src={favicon} width="70px" alt="favicon" />
                <span className="text-uppercase h2 fw-bold mx-2">Plannco <span className="h3">HOME DECORATION</span></span>
            </Link>

            <button type="button" className="navbar-toggler navbuttons crossxs" data-bs-toggle="collapse" data-bs-target="#nav">
                <div className="bg-light lines1"></div>
                <div className="bg-light lines2"></div>
                <div className="bg-light lines3"></div>
            </button>

            <div id="nav" className="navbar-collapse collapse justify-content-end text-uppercase fw-bold">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link to="/" className="nav-link mx-2 menuitems">Home</Link></li>
                    <li className="nav-item"><Link to="/aboutus" className="nav-link mx-2 menuitems">About Us</Link></li>
                    <li className="nav-item"><Link to="/properties" className="nav-link mx-2 menuitems">Properties</Link></li>
                    <li className="nav-item"><Link to="/services" className="nav-link mx-2 menuitems">Services</Link></li>
                    <li className="nav-item"><Link to="/customers" className="nav-link mx-2 menuitems">Customers</Link></li>
                    <li className="nav-item"><Link to="/furnitures" className="nav-link mx-2 menuitems">Furniture</Link></li>
                    <li className="nav-item"><Link to="/contacts" className="nav-link mx-2 menuitems">Contact</Link></li>
                </ul>
            </div>
            
        </nav>
    )
};

export default NavBar;