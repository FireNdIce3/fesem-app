import React from "react";
import "./Homebar.css";
import image from "./Fesem.png";
import image2 from "./iit.png";

function Homebar() {
  return (
    <>
      <div className="header">
        <div style={{marginTop:"14px"}} className="logo">
          <img  className="iitl" src={image2} />
        </div>
        <h1 style={{fontSize:"24px"}}>Department of Mechanical and Industrial Engineering <br></br><span >IIT Roorkee</span></h1>
        <div className="links" style={{marginLeft:"460px"}}>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
      <h2 className="about-heading" style={{textAlign:"center"}}>FESEM Booking</h2>
      <div className="content">
        
        <div className="about">
        <div className="wrapper">

<img className="image" src={image} />

</div>
        <div style={{marginLeft:"400px"}}>
          
          <h2 style={{fontWeight:"bold"}}>Contact Details:</h2>
          <ul>
            <li>
              Officer/Lab In-charge -{" "}
              <span style={{ fontWeight: "bold" }}>Dr Kaushik Pal </span>
            </li>
            <li>
              In-charge Email/Phone -{" "}
              <span style={{ fontWeight: "bold" }}>
                fesem@me.iitr.ac.in
              </span>
            </li>
            <li>
              Location -{" "}
              <span style={{ fontWeight: "bold" }}>
                MIED West Block (ground floor)
              </span>
            </li>
            <li>
              Status - <span style={{ fontWeight: "bold" }}>Active</span>
            </li>
            <li>
              Sample Requirements - <br />
              <ol style={{ fontWeight: "bold" }}>
                <li>Fine Powder Sample</li>
                <br />
                <li>Solid Sample of maximum size 1cm x 1cm x 1cm</li>
              </ol>
            </li>
            
             
          </ul>
          <br />
          </div>
       
         
          <br />
          
        </div>
        <br />

     
      </div>
    </>
  );
}

export default Homebar;
