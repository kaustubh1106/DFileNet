import React from 'react'
import { useState } from 'react'
import image1 from '../assets/32441.png'
const Group = ({ Contract }) => {
    
    const [groupname, setgroupname] = useState(null)
    const creategroup = async () => {
        try{const tx = await Contract.createGroup(groupname);
        const receipt = await tx.wait();
        if (receipt.status === 1) {
            alert("Group created");
        } else {
            alert("Transaction failed");
        }
    } catch (error) {
        console.error("Error creating group:", error);
        alert("Error creating group");
    }
}

return (
    <div>
        <div className="card" style={{ width: "18rem" }}>
            <img src={image1} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <form className="d-flex" role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Enter group name"
                        aria-label="Search"
                        onChange={(e) => { setgroupname(e.target.value) }}
                    />

                </form>
                <button className="btn btn-outline-success" type="submit" onClick={creategroup}>
                    Create
                </button>

            </div>
        </div>
    </div>
)
}

export default Group