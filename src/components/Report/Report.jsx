import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function Report() {
  const [loading, setLoading] = useState(true);
  const userName = JSON.parse(sessionStorage.getItem("name"));
  const userEmail = JSON.parse(sessionStorage.getItem("email"));
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const arr = [
    "9:30 A.M - 11:00A.M",
    "11:30 A.M - 1:00P.M",
    "2:00 P.M - 3:30P.M",
    "4:00 P.M - 5:30P.M",
  ];
  const fetchdata = async () => {
    fetch("http://localhost:8080/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    })
      .then(async (res) => {
        var body = await res.json();
        var arr2 = [];
        console.log(body);
        body.map((items) => {
          arr2.push(items);
          console.log(items);
        });
        setDetails(arr2);
        console.log(arr2);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
        window.location.reload();
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      <Header />

      <div className="buttons">
        <button
          className="table-button"
          style={{ backgroundColor: "red", width: "80px" }}
          value="logout"
          onClick={logout}
        >
          LogOut
        </button>
        <button
          className="table-button"
          style={{ backgroundColor: "green", width: "80px" }}
          value="block"
          onClick={() => {
            navigate("/");
          }}
        >
          Go Back
        </button>
      </div>

      <div className="admin-wrapper">
        <p className="admindescp">{`Welcome ${userName}`}</p>
        <LoadingSpinner loading={loading} />
        {details.length !== 0 && (
          <>
            <div
              className="table"
              style={loading ? { display: "none" } : { display: "block" }}
            >
              <table className="admin-details">
                <tr>
                  <th className="tth">Name</th>
                  <th className="tth">Email</th>
                  <th className="tth">Booking Date</th>
                  <th className="tth">Slot</th>
                  <th className="tth">Department</th>
                  <th className="tth">Service</th>
                  <th className="tth">Booking Done At</th>
                </tr>

                {details.map((items, i) => {
                  return (
                    <tr key={items._id}>
                      <td className="ttd">{items.userName}</td>
                      <td className="ttd">{items.userEmail}</td>
                      <td className="ttd">{items.bookingDate}</td>
                      <td className="ttd">{arr[items.slot]}</td>
                      <td className="ttd">{items.userDept}</td>
                      <td className="ttd">{items.service}</td>
                      <td className="ttd">{items.createdAt.split("T")[0]}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </>
        )}
        {details.length === 0 && (
          <div
            className="error"
            style={loading ? { display: "none" } : { display: "block" }}
          >
            No data to show
          </div>
        )}
      </div>
    </>
  );
}

export default Report;
