import React from "react";
import Head from "./head/Head";
import Foot from "./foot/Foot";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="card" style={{backgroundColor:"#240049"}}>
      <Head />
      <div style={{ minHeight: "70vh" }}>
        <div className="container">
          {" "}
        <Outlet />
        </div>
      </div>
      <div style={{ marginTop: "100px" }}>
      <Foot />
      </div>
    </div>
  );
}

export default Layout