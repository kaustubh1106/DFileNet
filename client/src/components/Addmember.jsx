import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
const Addmember = ({Contract}) => {
    const [address, setaddress] = useState()
    const { id } = useParams()
    console.log(id);
    const addmember = async()=>{
        try{const tx = await Contract.addEmployee(Number(id)-1,address);
        tx.wait()
        alert("member added");}catch{
            alert("some error occured")
        }
    }
    return (
        <div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                    Address of the member you want to add
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="0x00....."
                    onChange={(e)=>{setaddress(e.target.value)}}
                />
            </div>
            <button type="button" class="btn btn-light" onClick={addmember} >ADD+</button>
        </div>
    )
}

export default Addmember