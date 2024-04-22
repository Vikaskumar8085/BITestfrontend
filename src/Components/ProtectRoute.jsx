import React, { useEffect } from "react";
import Header from "./homecomponents/Header";

function ProtectRoute({ children }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  });

  return (
    <>
      <div className="container">
        <Header />
        {children}
      </div>
    </>
  );
}

export default ProtectRoute;
