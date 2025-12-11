import React,{useEffect, useState} from "react";

const Services = ()=>{
    
    const [images, setImages] = useState({});

    useEffect(()=>{
        
        const importimages = async()=>{
            
            try{

                const imageMoldules = await Promise.all([
                    import('../assets/img/gallery/image1.jpg'),
                    import('../assets/img/gallery/image2.jpg'),
                    import('../assets/img/gallery/image3.jpg'),
                    import('../assets/img/gallery/image4.jpg'),
                    import('../assets/img/gallery/image5.jpg'),
                    import('../assets/img/gallery/image6.jpg')
                ]);

                // console.log(imageMoldules); // (6) [Module, Module, Module, Module, Module, Module]
                // console.log(imageMoldules[0].default); // /src/assets/img/gallery/image1.jpg

                setImages({
                    image1:imageMoldules[0].default,
                    image2:imageMoldules[1].default,
                    image3:imageMoldules[2].default,
                    image4:imageMoldules[3].default,
                    image5:imageMoldules[4].default,
                    image6:imageMoldules[5].default
                });

            }catch(err){
                console.error("Error loading images : ",err);
            }

        }

        importimages();

        // console.log(import('../assets/img/gallery/image1.jpg')); // Promise {<pending>}

    },[]);

    const datas = [
        {
            imgname:'image1',
            title:'Living Room'
        },
        {
            imgname:'image2',
            title:'Mini Bar'
        },
        {
            imgname:'image3',
            title:'Dining Room'
        },
        {
            imgname:'image4',
            title:'Meeting Room'
        },
        {
            imgname:'image5',
            title:'Bed Room'
        },
        {
            imgname:'image6',
            title:'Pantry Room'
        }
    ];

    // console.log(Object.keys(images)); // ['image1', 'image2', 'image3', 'image4', 'image5', 'image6']

    if(Object.keys(images).length ===0){
        return <div className="text-center py-5">Loading images...</div>
    }

    return(
        <>
            {/* Start Services Section */}
            <section className="services py-4">
                <div className="container-fluid">

                    {/* Start title */}

                    <div className="row text-center">
                        <div className="col text-white">
                            <h3 className="titles">Our Services</h3>
                            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                    </div>

                    {/* End title */}

                    <div className="row">

                        {
                            datas.map((data,idx) => (
                                <div key={idx} className="col-lg-4 col-md-6 col-sm-12 mb-3">
                                    <div className="card servicecards">
                                        <img src={images[data.imgname]} alt="image1" />
                                        <h5 className="text-white text-uppercase fw-bold 0-2 headings">{data.title}</h5>
                                    </div>
                                </div>
                            ))
                        }

                        

                    </div>

                </div>
            </section>
            {/* End Services Section */}
        </>
    )
};

export default Services;