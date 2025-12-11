import React from "react";

import AboutUs from '../components/AboutUs'
import Adv from '../components/Adv'
import BackToTop from '../components/BackToTop'
import Contact from '../components/Contact'
import Clients from '../components/Clients'
import Customers from '../components/Customers'
import Furniture from '../components/Furniture'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import Properties from '../components/Properties'
import Quote from "../components/Quote"
import Services from '../components/Services'
import Footer from '../components/Footer'


const HomePage = ()=>{
    return(
        <>
            <Header />
            <NavBar />
            <AboutUs />
            <Properties />
            <Adv />
            <Services />
            <Clients />
            <Customers />
            <Quote />
            <Furniture />
            <Contact />
            
            <BackToTop />
        </>
    )
};

export default HomePage;