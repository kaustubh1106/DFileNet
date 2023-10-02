import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Grouplist = ({ Contract, Signer }) => {

    const [fetched, setFetched] = useState(false)
    const [groups, setgroups] = useState([])

    const _showgroupbyaddress = async () => {

        if (Signer && Signer.address) {

            setFetched(false);
            try {
                console.log(Signer.address);
                const _groups = await Contract.showgroupsbyaddress(Signer.address);
                console.log(_groups)
                setgroups(_groups)
                setFetched(true);
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        _showgroupbyaddress() 
    }, [Signer])

    return (
        <div>
            <h1>joined groups</h1>
            {fetched ? groups.map((log) => {
                return (
                    <div>
                        <button className="btn btn-outline-success" type="submit" >
                            <Link to={`/joinedgroup/${log[4]}`} className='btn btn-primary mylink'>{log[1]}</Link>
                        </button>
                        

                    </div>
                )
                // console.log(log[1]);
            }) : 'Fetching Data...'}
        </div>
    )
}

export default Grouplist