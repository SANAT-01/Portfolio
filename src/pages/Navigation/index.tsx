"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import Sidebar from "./sidebar";

const NavBar = () => {
  const [shadow, setShadow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 500) {
        setShadow(false);
      } else {
        setShadow(true);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  const links = [
    { title: "Home", link: "/" },
    { title: "About", link: "#about" },
    { title: "Skills", link: "#skills" },
    { title: "Background", link: "#background" },
    { title: "Projects", link: "#projects" },
    { title: "Contact", link: "#contact" },
  ];

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div
      className={
        shadow
          ? " bg-green-950 fixed w-full h-20 l z-[100] ease-in-out duration-700 hidden md:flex"
          : "fixed w-full h-20 z-[100] "
      }
    >
      <motion.div style={{ scaleX }} className="h-2 bg-white" />
      {shadow ? (
        <div className="flex justify-end md:justify-center items-center w-full h-full px-2">
          <div className="text-green-300">
            <ul className=" hidden md:flex ">
              {links.map((link) => {
                return (
                  <div
                    key={link.title}
                    onClick={() => {
                      router.push(link.link);
                    }}
                    className="cursor-pointer"
                  >
                    <li className="ml-10 text-sm uppercase font-bold hover:text-white">
                      {link.title}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-white">
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default NavBar;
