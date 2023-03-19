import React from "react";
import Nav from "../navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen">
      <Nav />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
