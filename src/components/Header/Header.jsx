import React from 'react'
import "./Header.css"
import image from "./iit.png";

function Header() {
  return (
    <div className='header'>
    <div className='logo' style={{marginTop:"10px"}}>
      <img className='iitl' src={image}/>
    </div>
    <h1 style={{fontSize:"24px"}}>Department of Mechanical and Industrial Engineering <br></br><span >IIT Roorkee</span></h1>
    </div>
  )
}

export default Header