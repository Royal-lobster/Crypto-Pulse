import React from "react";
import Nav from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen">
      <Nav />
      <div className="container mx-auto p-4">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
