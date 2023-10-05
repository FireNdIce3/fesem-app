import { Route,Routes } from "react-router-dom";
import React from 'react'
import Login from "./components/Login/Login";
import Homebar from "./components/Homebar/Homebar";

function Switch() {
  return (
    <Routes>
        <Route exactpath="/login" element={<Login/>}/>
        <Route exactpath="/" element={<Homebar/>}/>
    </Routes>
  )
}

export default Switch