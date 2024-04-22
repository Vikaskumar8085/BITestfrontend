import React from "react";
import { ClipLoader, HashLoader, RiseLoader } from "react-spinners";

export default function Loader() {
  return (
    <>
      <div className="loader_wrapper">
        <div className="loader_box">
          <RiseLoader color="#04537a" size={10} />
        </div>
      </div>
    </>
  );
}
