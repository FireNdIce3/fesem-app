import React, { useEffect, useState } from "react";
import "./Booking.css";
import Header from "../Header/Header";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const nextDate = (index) => {
  var today = new Date();
  today.setDate(today.getDate() + ((index - 1 - today.getDay() + 7) % 7) + 1);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const string = `${days[index % 7]} (${("0" + today.getDate()).slice(-2)}/${(
    "0" +
    (today.getMonth() + 1)
  ).slice(-2)}/${today.getFullYear() % 100})`;
  return string;
};

function Booking() {
  const [detail, setDetail] = useState(new Map());
  const [service, setService] = useState("");
  const [tempBook, setTempBook] = useState("");
  const [sl, setSl] = useState(false);
  const [bid, setBid] = useState("");
  const [cl, setCl] = useState(false);
  const [coating, setCoating] = useState("");
  const d = new Date();
  var day = d.getDay();
  var hours = d.getHours();
  const navigate = useNavigate();
  const userName = JSON.parse(sessionStorage.getItem("name"));
  const userEmail = JSON.parse(sessionStorage.getItem("email"));
  const dept = JSON.parse(sessionStorage.getItem("dept"));
  const bookingsAvailableThisWeek = JSON.parse(
    sessionStorage.getItem("bookingsAvailableThisWeek")
  );
  var cond1, cond2, condition;
  if (dept === "MIED") {
    cond1 = day < 4 || day > 5;
    cond2 = day == 5 && hours >= 12;
    condition = cond1 || cond2;
  } else {
    cond1 = day == 3 && hours > 12;
    cond2 = day > 3 && day <6;
    condition = cond1 || cond2;
  }
  const [loading, setLoading] = useState(true);
  const parr = [0, 1, 2, 3,];
  const parr2 = [4, 5];
  var arr = parr.filter((v) => {
    if (day > 5) {
      return v;
    } else {
      return v >= day;
    }
  });
  if (day >=5) {
    arr = parr;
  }
  const arr2 = parr2.filter((v) => {
    if(day<5){
    return v >= day;
    }
    else{
      return v
    }
  });

  const slots = [0, 1, 2, 3];
  const details = new Map();

  const fetchdata = async () => {
    fetch("http://localhost:8080/book/fetch")
      .then(async (res) => {
        var body = await res.json();
        body.array?.map((items) => {
          details.set(items.bookingCode, items.userName);
        });
        setDetail(details);
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

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const handleSubmit = (event) => {
    console.log(tempBook);
    if (tempBook !== null) {
      event.preventDefault();
      sessionStorage.setItem("service", JSON.stringify(service));
      sessionStorage.setItem("coating", JSON.stringify(coating));
      sessionStorage.setItem("bookingTime", JSON.stringify(tempBook));
      navigate("/receipt");
    }
  };

  return (
    <>
      <Header />
      <button
        className="table-button"
        style={{ backgroundColor: "red", width: "100px",  marginLeft: "20px" , fontSize:"12px"}}
        value="logout"
        onClick={logout}
      >
        LogOut
      </button>
      <button
        className="table-button"
        style={{ backgroundColor: "blue", width: "100px", marginLeft: "20px" , fontSize:"12px"}}
        value="Show Report"
        onClick={() => {
          navigate("/report");
        }}
      >
        Show Report
      </button>
      <button
        className="table-button"
        style={{ backgroundColor: "black", width: "100px", marginLeft: "20px" , fontSize:"12px"}}
        value="Edit Profile"
        onClick={() => {
          navigate("/edit");
        }}
      >
        Edit Profile
      </button>
      <button
        className="table-button"
        style={{ backgroundColor: "#90EE90", width: "100px", marginLeft: "20px" , fontSize:"12px"}}
        value="Show Slots"
        onClick={() => {
          navigate("/table");
        }}
      >
        Show Slots
      </button>
      {bookingsAvailableThisWeek == 1 && condition && (
        <>
          <LoadingSpinner loading={loading} />
          <div
            className="table"
            style={loading ? { display: "none" } : { display: "block" }}
          >
            <p className="title" style={{ fontWeight: "lighter" }}>
              {`Welcome ${userName}, Book your slot now`}
            </p>
            <table className="booking-details">
              <col />
              <colgroup span="4"></colgroup>
              <tr>
                <td rowSpan="2"></td>
                <th
                colSpan="4"
                className="time"
                style={{ textAlign: "center" , fontSize:"16px",textDecoration:"underline"}}
                scope="colgroup"
              >
                Slot Time
              </th>
              </tr>
              <tr>
                <th scope="col">9:30 A.M - 11:00A.M</th>
                <th scope="col">11:30 A.M - 1:00P.M</th>
                <th scope="col">2:00 P.M - 3:30P.M</th>
                <th scope="col">4:00 P.M - 5:30P.M</th>
              </tr>
              {dept === "MIED" &&
                detail !== undefined &&
                arr.map(function (v, i) {
                  return (
                    <tr key={i}>
                      <th scope="row">{`${nextDate(v + 1)}`}</th>

                      {slots.map(function (value, x) {
                        const string = `${nextDate(v + 1)}_${value}`;
                        const avail = detail.get(`${nextDate(v + 1)}_${value}`);
                        console.log(avail);
                        return (
                          <td key={value}>
                            <button
                              id={`${i}${x}`}
                              onClick={() => {
                                var y = null;
                                y = !avail ? string : y;
                                setTempBook(y);
                                setSl(true);
                                setBid(`${i}${x}`);
                                console.log(bid);
                                console.log(tempBook);
                              }}
                              className="table-button"
                              style={
                                bid === `${i}${x}`
                                  ? { backgroundColor: "orange" }
                                  : avail == "admin"
                                  ? { backgroundColor: "grey" }
                                  : avail
                                  ? { backgroundColor: "red" }
                                  : { backgroundColor: "#51CA26" }
                              }
                              disabled={
                                avail == "admin" || avail === false
                                  ? true
                                  : false
                              }
                            >
                              {avail == "admin"
                                ? "Not-Available"
                                : !avail
                                ? "Available"
                                : "Booked"}
                            </button>{" "}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              {dept !== "MIED" &&
                detail !== undefined &&
                arr2.map(function (v, i) {
                  return (
                    <tr key={i}>
                      <th scope="row">{`${nextDate(v + 1)}`}</th>

                      {slots.map(function (value, x) {
                        const string = `${nextDate(v + 1)}_${value}`;
                        const avail = detail.get(`${nextDate(v + 1)}_${value}`);
                        return (
                          <td key={value}>
                            <button
                              id={`${i}${x}`}
                              onClick={() => {
                                var y = null;
                                y = !avail ? string : y;
                                setTempBook(y);
                                setSl(true);
                                setBid(`${i}${x}`);
                                console.log(bid);
                                console.log(tempBook);
                              }}
                              className="table-button"
                              style={
                                bid === `${i}${x}`
                                  ? { backgroundColor: "orange" }
                                  : avail == "admin"
                                  ? { backgroundColor: "grey" }
                                  : avail
                                  ? { backgroundColor: "red" }
                                  : { backgroundColor: "#51CA26" }
                              }
                              disabled={avail}
                            >
                              {avail == "admin"
                                ? "Not-Available"
                                : !avail
                                ? "Available"
                                : "Booked"}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </table>
          </div>
          <form onSubmit={handleSubmit} className="methods">
            <div className="booking-wrapper">
              {sl && (
                <div className="services">
                  <h4>Booking Services</h4>

                  <div className="option">
                    <input
                      type="radio"
                      id="fesem"
                      name="service"
                      onClick={() => {
                        setCl(true);
                      }}
                      value="FESEM"
                      onChange={(e) => {
                        setService(e.target.value);
                      }}
                      required
                    />
                    <label style={{ fontSize: "15px" }} htmlFor="fesem">
                      FESEM
                    </label>
                    <br />
                  </div>
                  <div className="option">
                    <input
                      type="radio"
                      id="eds"
                      name="service"
                      onClick={() => {
                        setCl(true);
                      }}
                      value="FESEM + EDS"
                      onChange={(e) => {
                        setService(e.target.value);
                      }}
                      required
                    />
                    <label style={{ fontSize: "15px" }} htmlFor="eds">
                      FESEM + EDS
                    </label>
                    <br />
                  </div>
                  <div className="option">
                    <input
                      type="radio"
                      id="ebsd"
                      name="service"
                      onClick={() => {
                        setCl(true);
                      }}
                      value="FESEM + EDS + EBSD"
                      onChange={(e) => {
                        setService(e.target.value);
                      }}
                      required
                    />
                    <label style={{ fontSize: "15px" }} htmlFor="ebsd">
                      FESEM + EDS + EBSD
                    </label>
                    <br />
                  </div>
                </div>
              )}
              {cl && (
                <div>
                  <h4>Charges</h4>
                  <div className="charges">
                    <div className="option">
                      <input
                        type="radio"
                        id="withoutCoating"
                        name="charge"
                        value="withoutCoating"
                        onChange={(e) => {
                          setCoating(e.target.value);
                        }}
                        required
                      />
                      <label
                        style={{ fontSize: "15px" }}
                        htmlFor="withoutCoating"
                      >
                        Without Coating{" "}
                        {dept === "MIED" ? `(Rs. 50)` : `(Rs. 100)`}
                      </label>
                      <br />
                    </div>
                    <div className="option">
                      <input
                        type="radio"
                        id="coating"
                        name="charge"
                        value="coating"
                        onChange={(e) => {
                          setCoating(e.target.value);
                        }}
                        required
                      />
                      <label style={{ fontSize: "15px" }} htmlFor="coating">
                        With Coating{" "}
                        {dept === "MIED" ? `(Rs. 75)` : `(Rs. 125)`}
                      </label>
                      <br />
                    </div>
                  </div>
                  <div className="button">
                    <input type="submit" value="Proceed" />
                  </div>
                </div>
              )}
            </div>
          </form>
        </>
      )}
      {bookingsAvailableThisWeek == 1 && !condition && (
        <>
          <div className="error" style={{backgroundColor:"wheat",color:"blue"}}>
            Sorry the booking is closed as per now.. It will reopen at Friday
            12pm for MIED Students and at Wednesday 12pm for Non-MIED Students
          </div>
        </>
      )}
      {bookingsAvailableThisWeek != 1 && userName != undefined && (
        <>
          <div className="error" style={{backgroundColor:"wheat",color:"blue"}}>
            Sorry you have already done booking for this week. Try again next
            week!
          </div>
        </>
      )}
    </>
  );
}

export default Booking;
