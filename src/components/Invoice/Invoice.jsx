import React, { useEffect } from "react";
import Header from "../Header/Header";
import "./Invoice.css";
import image from "./iit.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";

import firebaseApp from "./firebase";
import axios from "axios";

function Invoice() {
  const userName = JSON.parse(sessionStorage.getItem("name"));
  const userEmail = JSON.parse(sessionStorage.getItem("email"));
  const dept = JSON.parse(sessionStorage.getItem("dept"));
  const contactNo = JSON.parse(sessionStorage.getItem("contactNo"));
  const enrollNo = JSON.parse(sessionStorage.getItem("enrollNo"));
  const service = JSON.parse(sessionStorage.getItem("service"));
  const price = JSON.parse(sessionStorage.getItem("price"));
  const bookingCode = JSON.parse(sessionStorage.getItem("bookingTime"));
  var coating = "";
  if (price % 50 == 0) {
    coating = "No";
  } else {
    coating = "Yes";
  }
  const navigate = useNavigate();

  const addInvoice = async (downloadUrl) => {
    try {
      const res = await axios.post("http://localhost:8080/addInvoice", {
        userEmail: userEmail,
        bookingTime: bookingCode,
        invoiceUrl: downloadUrl,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPdfDocument = (rootElementId) => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const ImageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(ImageData, "JPEG", 0, 0);
      pdf.save("invoice.pdf");

      const pdfData = pdf.output("blob");
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, "invoice.pdf");
      const uploadTask = uploadBytesResumable(storageRef, pdfData);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress of the upload
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          // Upload completed
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Download URL:", downloadURL);
            addInvoice(downloadURL);
            setTimeout(() => {
              sessionStorage.setItem(
                "bookingsAvailableThisWeek",
                JSON.stringify(0)
              );
              navigate("/");
            }, 2000);
          });
        }
      );
    });
  };

  const arr = [
    "9:30 A.M - 11:00A.M",
    "11:30 A.M - 1:00P.M",
    "2:00 P.M - 3:30P.M",
    "4:00 P.M - 5:30P.M",
  ];
  return (
    <Document>
      <Page size={595} wrap>
        <View id="ViewToDownload">
          <View className="invoice">
            <View className="logoHead">
              <Image className="iitlogo" src={image} />
              <View className="headingiit">
                <h2 className="headLogo">
                  Department of Mechanical & Industrial Engineering
                </h2>
                <h2 className="headLogo">
                  Indian Institute of Technology Roorkee
                </h2>
                <h2 className="headLogo2">booking form for FESEM-EDS-EBSD</h2>
                <br />
              </View>
            </View>
          </View>

          <View className="invoice-form">
            <View className="flexbox">
              <View className="flexitem1">Username:</View>
              <View className="flexitem2">{`${userName}`}</View>
              <View className="flexitem3">Department:</View>
              <View className="flexitem4">{`${dept}`}</View>
            </View>
            <View className="flexbox">
              <View className="flexitem1">Enrollment No:</View>
              <View className="flexitem2">{`${enrollNo}`}</View>
              <View className="flexitem3">Signature:</View>
              <View className="flexitem4"></View>
            </View>
            <View className="flexbox">
              <View className="flexitem5">Contact Details:</View>
              <View className="flexitem3">Booking Slot:</View>
              <View className="flexitem4">{`${
                arr[bookingCode.split("_")[1]]
              }`}</View>
            </View>

            <View className="flexbox">
              <View className="flexitem1">Email:</View>
              <View className="flexitem2">{`${userEmail}`}</View>
              <View className="flexitem3">Booking ID:</View>
              <View className="flexitem4"></View>
            </View>
            <View className="flexbox">
              <View className="flexitem1">Contact No:</View>
              <View className="flexitem2">{`${contactNo}`}</View>
              <View className="flexitem3">Total Charges</View>
              <View className="flexitem4">{`${price}`}</View>
            </View>
            <View className="flexbox">
              <View className="flexitem5">Sample Details:</View>
              <View className="flexitem3">Service Name:</View>
              <View className="flexitem4">{`${service}`}</View>
            </View>
            <View className="flexbox">
              <View className="flexitem1">Coating:</View>
              <View className="flexitem2">{coating}</View>
              <View className="flexitem3">No of Samples:</View>
              <View className="flexitem4">1</View>
            </View>
            <View className="flexbox">
              <View className="flexitem1">Supervisor Name:</View>
              <View className="flexitem2"></View>
              <View className="flexitem3">Supervisor Signature</View>
              <View className="flexitem4"></View>
            </View>
          </View>
          <>
            <p></p>
          </>
          <View className="invoice-form">
            <View className="flexbox">
              <View className="flexitem6">For MIED Once Use Only</View>
            </View>
            <View className="flexbox">
              <View className="flexitem7">Payment Reciept No: __________</View>
              <View className="flexitem7">Date: __________</View>
              <View className="flexitem7">Amount Paid: __________</View>
            </View>
            <View className="flexbox">
              <View className="flexitem6">For FESEM Operator</View>
            </View>

            <View className="flexbox">
              <View className="flexitem8">Form Recieved: Yes/No</View>
              <View className="flexitem7">Payment Recieved: Yes/No</View>
            </View>
            <View className="flexbox">
              <View className="flexitem9">Operator Signature : __________</View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default Invoice;
