import React from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import favicon from "../assets/img/fav/favicon.png"

const Footer = ()=>{
    return(
        // Start Footer Section
		<footer className="bg-dark px-5">
			<div className="container-fluid">
                
				<div className="row text-light py-4">

					<div className="col-md-3 col-sm-6">
						<h5 className="mb-3"><img src={favicon} width="70" alt="footericon" /> About PLANNCO</h5>
						<p className="small">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
					</div>

					<div className="col-md-3 col-sm-6">
						<h5 className="mb-3">Visit Us</h5>
						<ul className="list-unstyled">
							<li><Link to="/" className="footerlinks">Home</Link></li>
							<li><Link to="/aboutus" className="footerlinks">About</Link></li>
							<li><Link to="/properties" className="footerlinks">Properties</Link></li>
							<li><Link to="/services" className="footerlinks">Services</Link></li>
							<li><Link to="/customers" className="footerlinks">Customers</Link></li>
							<li><Link to="/furnitures" className="footerlinks">Furniture</Link></li>
							<li><Link to="/contacts" className="footerlinks">Contact</Link></li>
						</ul>
					</div>

					<div className="col-md-3 col-sm-6">
						<h5 className="mb-3">Need Help?</h5>
						<ul className="list-unstyled">
							<li><a href="javascript:void(0);" className="footerlinks">Customers Services</a></li>
							<li><a href="javascript:void(0);" className="footerlinks">Online Chat</a></li>
							<li><a href="javascript:void(0);" className="footerlinks">Support</a></li>
							<li><a href="javascript:void(0);" className="footerlinks">info@plannco.com</a></li>
						</ul>
					</div>

					<div className="col-md-3 col-sm-6">
						<h5 className="mb-3">Contact Us</h5>
						<ul className="list-unstyled">
							<li><a href="javascript:void(0);" className="footerlinks">1-9/19(A),60 Street, Between Theik Pan Street And, Aung San St, Mandalay.</a></li>
							<li><a href="javascript:void(0);" className="footerlinks">Phone: +95 9 422042225 / +95 9 422042242</a></li>
						</ul>
					</div>
				</div>


				<div className="text-light border-top pt-4 d-flex justify-content-between">
					<p>&copy; <span id="getyear">2000</span> Copyright. Inc,ALl rights reserced.</p>
					<ul className="list-unstyled d-flex">
						<li><a href="jacascript:void(0);" className="nav-link"><FontAwesomeIcon icon="fa-brands fa-square-x-twitter" /></a></li>
						<li className="ms-3"><a href="jacascript:void(0);" className="nav-link"><FontAwesomeIcon icon="fa-brands fa-square-instagram" /></a></li>
						<li className="ms-3"><a href="jacascript:void(0);" className="nav-link"><FontAwesomeIcon icon="fa-brands fa-square-facebook" /></a></li>
					</ul>
				</div>
			</div>
		</footer>
        // Start Footer Section
    )
};

export default Footer;