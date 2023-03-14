import React from "react";
import Nav from "../navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen">
      <Nav />
      {children}
    </main>
  );
};

export default Layout;
