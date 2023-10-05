import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Receipt.css";
import image2 from "./image.png";
import { useNavigate } from "react-router-dom";

function Receipt() {
  const service = JSON.parse(sessionStorage.getItem("service"));
  const [button, setButton] = useState(true);
  const userName = JSON.parse(sessionStorage.getItem("name"));
  const id2 = JSON.parse(sessionStorage.getItem("_id"));
  const userEmail = JSON.parse(sessionStorage.getItem("email"));
  const dept = JSON.parse(sessionStorage.getItem("dept"));
  const bookingCode = JSON.parse(sessionStorage.getItem("bookingTime"));
  const arr = [
    "9:30 A.M - 11:00A.M",
    "11:30 A.M - 1:00P.M",
    "2:00 P.M - 3:30P.M",
    "4:00 P.M - 5:30P.M",
  ];
  const coating = JSON.parse(sessionStorage.getItem("coating"));
  var x = coating === "coating" ? 75 : 50;
  var price = dept === "MIED" ? x : x + 50;

  const dataLoad = () => {
    if (coating === null) {
      navigate("/");
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    dataLoad();
  }, []);

  const handleSubmit = async (event) => {
    fetch("http://localhost:8080/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingTime: bookingCode,
        id: id2,
        userName: userName,
        userEmail: userEmail,
        userDept: dept,
        service: service,
        price: price,
      }),
    })
      .then((data) => {
        data.json();
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
    setButton(false);
    sessionStorage.setItem("price", price);
    sessionStorage.removeItem("coating");
    setTimeout(() => {
      navigate("/invoice");
    }, 3000);
  };

  return (
    <>
      <Header />

      {button && (
        <>
          <h2 style={{ fontWeight: "bold" }}>Your Booking</h2>
          <div className="payment-wrapper">
            <div className="booking-details">
              `
              <h2 style={{ fontWeight: "lighter" }} className="details">
                {`Booking Date : ${bookingCode.split("_")[0]}`} <br />
                {`Slot Timing : ${arr[bookingCode.split("_")[1]]}`} <br />
                {`Services Booked : ${service}`} <br />
                {`Total Payment : Rs.${price}`}
              </h2>
              `
              <form onSubmit={handleSubmit}>
                <div className="button">
                  <input type="submit" value="Submit" />
                </div>
              </form>
              <br />
            </div>
            <br />

            <img className="image2" src={image2} />
          </div>
        </>
      )}
      {!button && (
        <>
          <div className="error">Success! your booking has been done</div>
        </>
      )}
    </>
  );
}

export default Receipt;
