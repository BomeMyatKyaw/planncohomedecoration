import React from "react";

import services1 from '../assets/img/icon/services1.png'
import services2 from '../assets/img/icon/services2.png'
import services3 from '../assets/img/icon/services3.png'
import services4 from '../assets/img/icon/services4.png'
import services5 from '../assets/img/icon/services5.png'
import services6 from '../assets/img/icon/services6.png'

const Furniture = ()=>{

    const services = [
        {
            id:1,
            image:services1,
            title:"Furniture Services",
            desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            id:2,
            image:services2,
            title:"Secure Payment",
            desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            id:3,
            image:services3,
            title:"Expert team",
            desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            id:4,
            image:services4,
            title:"Affordable services",
            desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            id:5,
            image:services5,
            title:"90 Days Warranty",
            desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            id:6,
            image:services6,
            title:"Award Winning",
            desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        }
    ]

    return(
        <>
            {/* Start Furniture Section */}
            <section className="bg-light text-center py-3">
                <div className="container">

                    {/* Start title */}
                    <div className="text-center">
                        <div className="col">
                            <h3 className="titles">Furniture Services</h3>
                            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                    </div>
                    {/* End title */}

                    <div className="row funicons">
                        {
                            services.map((services)=>(
                                <div key={services.id} className="col-md-4">
                                    <img src={services.image} alt="services1" />
                                    <h4>{services.title}</h4>
                                    <p>{services.desc}</p>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </section>
            {/* End Furniture Section */}
        </>
    )
};

export default Furniture;