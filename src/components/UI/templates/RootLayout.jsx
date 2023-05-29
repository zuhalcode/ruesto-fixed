import Footer from "@components/home/templates/Footer";
import Head from "next/head";
import React from "react";
import Navbar from "../organisms/Navbar";

const RootLayout = ({ children, title = "Home" }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/ruesto-logo.ico" />
        <title>Ruesto | {title}</title>
      </Head>
      <div className="overflow-hidden">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
