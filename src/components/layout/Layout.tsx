import React from "react";
import Nav from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Nav />
      <div className="container mx-auto p-4">{children}</div>
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
