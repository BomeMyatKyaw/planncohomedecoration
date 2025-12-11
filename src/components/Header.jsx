import React from "react";
import Navbar from "./NavBar"

import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome"

const Header = ()=>{
    return(
        <>

            {/* Start Back to Top */}
            <div className="fixed-bottom">
                <a href="#" className="btn-backtotops"><FontAwesomeIcon icon="fa-solid fa-arrow-up" /></a>
            </div>
            {/* End Back to Top */}

        
            {/* Start Header Section */}
            <header>

                {/* Start Banner */}
                <div className="text-light text-center text-md-end banners">
                    <h1 className="display-5 bannertheaders">Welcome to <span className="display-2 text-uppercase">Plannco</span> Home Decoration Co.,Ltd</h1>
                    <p className="lead bannerparagraphs">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                {/* End Banner */}

            </header>
            {/* End Header Section */}
        </>
    )
};

export default Header;