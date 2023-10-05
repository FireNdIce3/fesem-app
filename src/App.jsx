import React, { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Homebar from "./components/Homebar/Homebar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Booking from "./components/Booking/Booking";
import Receipt from "./components/Receipt/Receipt";
import useToken from "./components/useToken";
import Admin from "./components/Admin/Admin";
import Invoice from "./components/Invoice/Invoice";
import useAdmin from "./components/useAdmin";
import Abook from "./components/Abook/Abook";
import Report from "./components/Report/Report";
import Edit from "./components/Edit/Edit";
import Table from "./components/Table/Table";

function App({ routes }) {
  const { token, setToken } = useToken();
  const { admin, setAdmin } = useAdmin();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Homebar />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setAdmin={setAdmin} />}
        />
        <Route path="/register" element={<Register />} />
      </Route>
    )
  );
  const router2 = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Booking />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/report" element={<Report />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/table" element={<Table />} />
      </Route>
    )
  );
  const router3 = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Admin />} />
        <Route path="/abook" element={<Abook />} />
      </Route>
    )
  );

  if (!token && !admin) {
    return (
      <>
        <RouterProvider router={router} />
      </>
    );
  } else if (admin) {
    return (
      <>
        <RouterProvider router={router3} />
      </>
    );
  }
  return (
    <>
      <RouterProvider router={router2} />
    </>
  );
}

export default App;
