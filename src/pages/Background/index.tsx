"use client";
import React, { useEffect, useState } from "react";
import SectionTitle from "../Contact/sectionTitle";
import ExperienceList from "./experience";

const Background = () => {
  // State to store screen width
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [scrollHeightBase, setScrollHeightBase] = useState<number>(0);

  // This will run only when the component is mounted on the client side
  useEffect(() => {
    // Check if window is defined (i.e., in a browser environment)
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth); // Set the initial screen width value on client-side
    }

    // Resize handler
    const handleResize = () => {
      setScreenWidth(window.innerWidth); // Update screen width when resized
    };

    // Add event listener for resizing
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    // Set the scroll height base depending on the screen width
    if (screenWidth < 640) setScrollHeightBase(3900);
    else if (screenWidth < 768) setScrollHeightBase(3200);
    else setScrollHeightBase(2000);

    // Cleanup event listener on component unmount
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [screenWidth]);

  return (
    <div id="background" className="w-full flex flex-col items-center">
      <div className="px-10 w-full md:w-[90%]">
        <div className="w-full">
          <SectionTitle title="Journey" subtitle="" />
        </div>
        <div className="items-center">
          <div className="">
            <div className="w-full"></div>
            <ExperienceList ActualBaseHeight={scrollHeightBase} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;
