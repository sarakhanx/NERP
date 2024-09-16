import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ProdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar>
        <Sidebar>{children}</Sidebar>
      </Navbar>
      <Footer />
    </>
  );
};

export default ProdLayout;
