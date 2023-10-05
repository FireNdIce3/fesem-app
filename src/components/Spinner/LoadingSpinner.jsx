import React from 'react'
import "./spinner.css";

function LoadingSpinner({loading}) {
  return (
    <div className="spinner-container" style={loading ? {display : "grid"} : {display: "none"} }>
    <div className="loading-spinner"></div>
  </div>
  )
}

export default LoadingSpinner