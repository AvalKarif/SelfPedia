/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../../../pages/Home/Navbar";

const MainLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default MainLayout;
