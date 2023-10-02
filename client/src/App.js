import './App.css';
import {Contract, ethers} from 'ethers'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from "./components/Main"
import Navbar from "./components/Navbar.jsx"
import { useEffect, useState } from 'react';
import instance from './Filetransfer.json'
import Group from './components/Group.jsx'
import Grouplist from './components/Grouplist.jsx'
import Addfile from './components/Addfile.jsx'
import Addmember from './components/Addmember.jsx'
function App() {
  const contractaddress = instance.networks[11155111].address;
  console.log(contractaddress)
  const [state,setstate]= useState({
    signer:null,
    contract:null
  })
  const abi = instance.abi;
  useEffect(()=>{
    const instancecreate=async()=>{
      try{if(window.ethereum==null){
        alert("download metamask");
      }
      else{
        // console.log(contractaddress)
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(contractaddress,abi,signer)
        setstate({
          signer,
          contract
        })
      }}catch(error){
        console.log(error)
      }
    }
    instancecreate();
    }
    ,[])
  return (
    <div className="App" >
      <Router>
        <Navbar/>
        <Routes>
          <Route path='' element={<Main Contract={state.contract}/>}/>
          <Route path='/creategroup' element={<Group Contract={state.contract}/>}/>
          <Route path='/joinedgroup' element={<Grouplist Contract={state.contract} Signer={state.signer}/>}/>
          <Route path='/joinedgroup/:id' element={<Addfile Contract={state.contract} Signer={state.signer}/>}/>
          <Route path='/joinedgroup/addmember/:id' element={<Addmember Contract={state.contract} Signer={state.signer}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
