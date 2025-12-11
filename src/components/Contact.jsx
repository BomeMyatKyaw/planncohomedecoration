import React,{useState} from "react";

const Contact = ()=>{

    const [formData,setFromData] = useState({
        name:'',
        email:'',
        accept:false
    });


    const changeHandler = (e)=>{
        // console.log(e.target);

        const {type,name,value,checked} = e.target;

        // console.log(type,name,value,checked);

        setFromData(prev =>({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log("Form submitted : ",formData);
    }

    return(
        // Start Contact Section
		<section className="p-5 contacts">

			<div className="container-fluid">
				<div className="col-md-5">
					<h5 className="display-4 text-white mb-3">Get New Letter</h5>
					<form onSubmit={submitHandler} action="" method="">
						<div className="form-group py-4">
							<input type="text" name="name" id="name" className="form-control p-3 inputs" placeholder="Enter Your Name" autoComplete="off" value={formData.name} onChange={changeHandler} required />
							<label htmlFor="name" className="labels">Name</label>
						</div>

						<div className="form-group py-4">
							<input type="email" name="email" id="email" className="form-control p-3 inputs" placeholder="Enter Your Email" autoComplete="off" value={formData.email} onChange={changeHandler} required />
							<label htmlFor="email" className="labels">Email</label>
						</div>

						<div className="my-5">
							<div className="form-check form-switch">
								<input type="checkbox" name="accept" id="accept" className="form-check-input" checked={formData.accept} onChange={changeHandler} required />		
								<label htmlFor="accept" className="text-light">I agree to get push notify.</label>
							</div>
						</div>

						<div className="d-grid">
							<button type="submit" className="btn text-uppercase  fw-bold rounded-0 summit-btns">Subscribe</button>
						</div>

					</form>

				</div>
			</div>
			
		</section>
		// End Contact Section
    )
};

export default Contact;