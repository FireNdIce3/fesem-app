import React, { useState } from "react";
import Header from "../Header/Header";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Spinner/LoadingSpinner";

function Register() {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otp2, setOtp2] = useState("");
  const [cond, setCond] = useState(true);
  const navigate = useNavigate();
  const handleOTP = (e) => {
    const value = e.target.value;
    setOtp(value);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const sendOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    fetch("http://localhost:8080/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: inputs.email }),
    }).then(async (res) => {
      if (res.status === 200) {
        var body = await res.json();
        setOtp2(body.otp);
        setCond(false);
        setLoading(false);
      }
    });
  };

  async function regUser(credentials) {
    return fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((res) => {
      if (res.status === 400) {
        alert("Email has already been registered!");
      }
      setLoading(false);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (otp == otp2) {
      setLoading(true);
      regUser(inputs);
      navigate("/login");
      alert("Successfully Registered!");
    } else {
      alert("Entered OTP is incorrect");
    }
  };
  return (
    <>
      <Header />
      <h3>Register</h3>
      {<LoadingSpinner loading={loading} />}
      {!loading && cond && (
        <form id="register" onSubmit={sendOtp}>
          <div className="form-wrapper">
            <div className="wrapper">
              <div>
                <label htmlFor="dept">User Type</label>
                <select
                  name="dept"
                  className="dept"
                  id="dept"
                  form="register"
                  onChange={handleChange}
                  required
                >
                  <option hidden disabled selected value></option>
                  <option value="MIED">MIED</option>
                  <option value="others">Others(Pls provide your input)</option>
                </select>
              </div>

              <div>
                <label htmlFor="email">Student Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your Email"
                 
                  title="example@me.iitr.ac.in"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="enroll">Student Enrollment Number</label>
                <input
                  type="number"
                  id="enroll"
                  name="enroll"
                  placeholder="Enter your Enroll number"
                  min={0}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  placeholder="Enter your Mobile Number"
                  min={0}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="date">
                  Date of Registration Enrollment program
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="supervisor">Supervisor Name</label>
                <input
                  type="text"
                  id="supervisor"
                  name="supervisor"
                  placeholder="Enter Name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="wrapper2">
              <div>
                <label htmlFor="name">Student Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  id="pass"
                  name="pass"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="userType">Student Department</label>
                <input
                  type="text"
                  id="userType"
                  name="userType"
                  placeholder=""
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="program">Enrolled Program</label>
                <select
                  name="program"
                  id="program"
                  form="register"
                  onChange={handleChange}
                  required
                >
                  <option hidden disabled selected value></option>
                  <option value="01">M.Tech</option>
                  <option value="02">PhD</option>
                  <option value="03">PostDoc</option>
                </select>
              </div>
              <div className="space"></div>

              <div style={{paddingTop: "20px"}}>
                <label htmlFor="supervisorDept">Supervisor Department</label>
                <input
                  className="sdept"
                  type="text"
                  id="supervisorDept"
                  name="supervisorDept"
                  placeholder=""
                  onChange={handleChange}
                  required
                />
              </div>
            
             
            </div>
            
          </div>
          <div style={{ marginRight:"260px", alignItems:"center"}}>
              <div className="button" >
                <input type="submit" value="Register" />
              </div>
              </div>
        </form>
      )}
      {!loading && !cond && (
        <>
          <div className="otp">
            <h2>Verify your Email</h2>
            <p>Enter the OTP sent to your email</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter OTP"
                onChange={handleOTP}
                required
              />
              <div className="button">
                <input
                  type="submit"
                  value="Verify"
                  style={{ backgroundColor: "#51CA26" }}
                />
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Register;
