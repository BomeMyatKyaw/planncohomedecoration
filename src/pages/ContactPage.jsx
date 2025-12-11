import React,{ useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientsays } from '../store/clientsaySlice';
import { submitContactForm,resetFormState } from '../store/contactFormSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import banner4 from '../assets/img/banner/banner4.jpg';

const ContactPage = ()=>{

    const {loading:clientsayLoading,error:clientsayError,datas} = useSelector(state=>state.clientsays);
    const {loading:formLoading,error:formError,successMessage} = useSelector(state=>state.contactforms);

    const [formData,setFormData] = useState({name:"",email:"",message:""});

    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const submitHandler = (e)=>{
        e.preventDefault();

        dispatch(submitContactForm(formData));
    }

    const dispatch = useDispatch();

    useEffect(()=>{

        dispatch(fetchClientsays());

        if(successMessage){
            setFormData({name:"",email:"",message:""});
            setTimeout(()=>dispatch(resetFormState()),5000);
        }

    },[successMessage,dispatch])

    return(
        <main className="bg-black text-light">
        
            {/* Banner*/}
            <section className="text-center d-flex justify-content-center align-items-center" style={{ 
                minHeight:"70vh",
                backgroundImage:`url(${banner4})`,
                backgroundSize:"cover",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
            }}>
            <div className="container bg-dark bg-opacity-50 rounded">
                <h1 className="display-6">Let's Contact</h1>
                <p className="lead">Have questions? Our team is here to help!</p>
            </div>
            </section>
    
            <section className="bg-black text-white py-5">

                <div className="container">
                    
                    <div className="text-center mb-5">
                        <h3 className="fw-bold mb-4">What Our Clients Say</h3>
                        <p className="lead">Trusted by thousands of customers worldwide</p>
                    </div>

                    {clientsayLoading && <p className="text-light text-center">Loading...</p>}
                    {clientsayError && <p className="text-light text-center">Error : {clientsayError}</p>}
                    
                    <div className="row g-4">

                        {datas.map((data,idx)=>(
                            <div className="col-lg-4" key={idx}>
                                <div className="card h-100 bg-dark border-light border-1 rounded-3">
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center mb-4">
                                            <img src={`https://randomuser.me/api/portraits/${data.gender == 'male' ? 'men' : 'women'}/${data.avaterId}.jpg`} className="rounded-circle me-3" width="60" height="60" alt="men" />
                                            <div>
                                                <h5 className="text-light mb-0">{data.name}</h5>
                                                <p className="text-light mb-0">{data.role}</p>
                                            </div>
                                        </div>
                                        <p className="card-text text-light">{data.feedback}</p>
                                        <div className="text-warning">

                                            {
                                                Array.from({length:Math.floor(data.rating)},(_,index)=>(
                                                    <FontAwesomeIcon icon="fa-solid fa-star" key={index} />
                                                ))
                                            }

                                            {
                                                data.rating % 1 !== 0 && <FontAwesomeIcon icon="fa-solid fa-star-half" />
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </section>
    
            <section className="bg-light text-dark py-5">
                <div className="container">
    
                    <h3 className="text-center mb-5">Send Us a Message</h3>
    
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form onSubmit={submitHandler}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="name" className="form-label">Your Name</label>
                                        <input type="text" name="name" id="name" className="form-control form-control-sm" value={formData.name} onChange={changeHandler} placeholder="Enter your name" autoFocus required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="email" className="form-label">Your Email</label>
                                        <input type="email" name="email" id="email" className="form-control form-control-sm" value={formData.email} onChange={changeHandler} placeholder="Enter your email" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">Your Message</label>
                                        <textarea name="message" id="message" className="form-control form-control-sm" rows="5" value={formData.message} onChange={changeHandler} placeholder="Write your message here" required></textarea>
                                    </div>

                                    {formLoading && <p className="text-primary">Sending...</p>}
                                    {formError && <p className="text-danger">Error : {formError}</p>}
                                    {successMessage && <p className="text-success">{successMessage}</p>}

                                    <div className="text-end">
                                        <button type="submit" className="btn btn-primary px-4">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
    
                </div>
            </section>

            <section>
                <div className="container-fluid p-0">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4397.56893310474!2d96.12259475113476!3d22.053428172234472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb6b0062cb56d7%3A0xa043279d5a6fd2cb!2z4YCT4YCU4YCe4YCt4YCS4YC54YCT4YCt4YCA4YC74YCx4YC44YCb4YC94YCs!5e0!3m2!1sen!2smm!4v1755250856434!5m2!1sen!2smm" 
                    width="100%" 
                    height="300" 
                    style={{border:0}} 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>
    
        </main>
    )
};

export default ContactPage;