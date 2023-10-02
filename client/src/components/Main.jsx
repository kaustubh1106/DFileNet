import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Main = () => {
    
    const [address, setaddress] = useState()
    const abc = async () => {
        try {
            const address = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setaddress(address[0]);
            // console.log(address)
        } catch {
            alert("some error occured")
        }
    }
    // useEffect(() => {
    //   abc()
    // },[] )
    
    return (
        <div>
            {!address &&
                <>
                    <button type="button" className="btn btn-primary" onClick={abc}>
                        connect to metamask
                    </button>
                </>
            }
            {
                address
                    ?
                    <>
                        <div className="row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Create Group</h5>
                                        <p className="card-text">
                                             
                                        </p>
                                        <Link to={"/creategroup"} className='btn btn-primary mylink'>+</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">go to the joined groups</h5>
                                        <Link to={"/joinedgroup"} className='btn btn-primary mylink'>^</Link>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Create Group</h5>
                                        <p className="card-text">
                                             
                                        </p>
                                        <Link to={"/creategroup"} className='btn btn-primary mylink'>+🙍🏻‍♂️</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </> : null
            }
        </div>
    )
}

export default Main