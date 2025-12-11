import React from "react";

import staffGirl from "../assets/img/users/staffgirl1.png";

const AboutUs = ()=>{
    return(
        <>
            {/* Start About Us Section */}
            <section className="py-5 aboutuss">
                <div className="container">
                    <div className="row">

                        <div className="col-sm-6 buildings">
                            <img src={staffGirl} alt="staffgirl1" />
                        </div>

                        <div className="col-sm-6 text-light">

                            <div className="col-md-12">
                                <h2 className="text-uppercase">Who are we !!!</h2>
                                <div className="lines"></div>
                                <div className="lines"></div>
                                <div className="lines"></div>
                            </div>

                            <h5><i>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</i></h5>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <a href="javascript:void(0);" className="btn btn-danger rounded-0">Read Me</a>
                        </div>

                    </div>
                </div>
            </section>
            {/* End About Us Section */}
        </>
    )
};

export default AboutUs;