import React,{useEffect, useState} from "react";

const Clients = ()=>{
    
    const [clientImages, setClientImages] = useState({});

    useEffect(()=>{
        
        const importclientimages = async()=>{
            
            try{

                const imageMoldules = await Promise.all([
                    import('../assets/img/clients/client1.png'),
                    import('../assets/img/clients/client2.png'),
                    import('../assets/img/clients/client3.png'),
                    import('../assets/img/clients/client4.png'),
                    import('../assets/img/clients/client5.png')
                ]);

                // console.log(imageMoldules); // (6) [Module, Module, Module, Module, Module, Module]
                // console.log(imageMoldules[0].default); // /src/assets/img/clients/client1.png

                setClientImages({
                    client1:imageMoldules[0].default, // client1:"/src/assets/img/clients/client1.png"
                    client2:imageMoldules[1].default,
                    client3:imageMoldules[2].default,
                    client4:imageMoldules[3].default,
                    client5:imageMoldules[4].default
                });

            }catch(err){
                console.error("Error loading client images : ",err);
            }

        }

        importclientimages();

        // console.log(import('../assets/img/gallery/image1.jpg')); // Promise {<pending>}

    },[]);

    // console.log(Object.keys(clientImages)); // ['client1', 'client2', 'client3', 'client4', 'client5', 'client6']

    if(Object.keys(clientImages).length === 0){
        return <div className="text-center py-5">Loading client images...</div>
    }

    return(
        <>
            {/* Start Client Section */}
            <section className="p-3">

                <div className="container-fluid">

                    {/* Start title */}

                    <div className="text-center">
                        <div className="col">
                            <h3 className="titles">Satisfied Clients</h3>
                            <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                    </div>

                    {/* End title */}

                    <div className="row">
                        <div className="col-12">
                            <ul className="clientlists">

                                {/* {
                                    Object.keys(clientImages).map((key,idx) =>{
                                        <li key={idx}>
                                            <img src={clientImages[key]} alt={key} />
                                        </li>
                                    })
                                } */}

                                {
                                    Object.entries(clientImages).map(([key,src]) =>{
                                        return(
                                            <li key={key}>
                                                <img src={src} alt={key} />
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                    </div>

                </div>
                
            </section>
            {/* End Client Section */}
        </>
    )
};

export default Clients;