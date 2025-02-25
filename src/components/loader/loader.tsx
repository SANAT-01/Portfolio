"use client";
import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-grayscale-950 flex items-center justify-center relative">
      <span
        style={{ fontFamily: "Poppins, sans-serif" }}
        className="absolute text-white text-xl"
      >
        ST
      </span>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
