import React, { useState } from "react";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import "./Edit.css";

function Edit() {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const userName = JSON.parse(sessionStorage.getItem("name"));
  const userEmail = JSON.parse(sessionStorage.getItem("email"));
  const id2 = JSON.parse(sessionStorage.getItem("_id"));
  const dept = JSON.parse(sessionStorage.getItem("dept"));
  const contactNo = JSON.parse(sessionStorage.getItem("contactNo"));
  const enrollNo = JSON.parse(sessionStorage.getItem("enrollNo"));
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  async function updateUser(credentials) {
    fetch("http://localhost:8080/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credentials: credentials, id: id2 }),
    }).then((res) => {
      setLoading(false);
    });
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(inputs);
    navigate("/");
  };
  return (
    <>
      <Header />
      <h3>Update Profile</h3>
      <p>{`Hi ${userName}. Please write all the details again to edit your profile`}</p>
      {<LoadingSpinner loading={loading} />}
      {!loading && (
        <form id="register" onSubmit={handleSubmit}>
          <div className="form-wrapper">
            <div className="wrapper">
              <div>
                <label htmlFor="dept">User Type</label>
                <select
                  name="dept"
                  id="dept"
                  form="register"
                  onChange={handleChange}
                  value={dept}
                  disabled
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
                  value={userEmail}
                  pattern=".+@.+\..+\.iitr\.ac\.in"
                  title="example@me.iitr.ac.in"
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div>
                <label htmlFor="enroll">Student Enrollment Number</label>
                <input
                  type="number"
                  id="enroll"
                  name="enroll"
                  placeholder={enrollNo}
                  min={0}
                />
              </div>

              <div>
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  placeholder={contactNo}
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
                  placeholder={userName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="pass">New Password</label>
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

              <div>
                <label htmlFor="supervisorDept">Supervisor Department</label>
                <input
                  type="text"
                  id="supervisorDept"
                  name="supervisorDept"
                  placeholder=""
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="button">
                <input type="submit" value="Edit" />
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Edit;

// sessionStorage.setItem('name', JSON.stringify(result.name));
//       sessionStorage.setItem('email', JSON.stringify(result.email));
//       sessionStorage.setItem('dept', JSON.stringify(result.dept));
//       sessionStorage.setItem('contactNo', JSON.stringify(result.contactNo));
//       sessionStorage.setItem('enrollNo', JSON.stringify(result.enrollNo));
//       sessionStorage.setItem('bookingsAvailableThisWeek', JSON.stringify(result.bookingsAvailableThisWeek));
//       sessionStorage.setItem('_id', JSON.stringify(result.id));
