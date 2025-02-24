"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { FaProjectDiagram } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { IoSchoolSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const router = useRouter();
  const handleNav = () => {
    setNav((prev) => !prev);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
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

  const linksIcons = [
    { title: "Home", link: "/", icon: <AiFillHome /> },
    { title: "About", link: "#about", icon: <BsFillInfoCircleFill /> },
    { title: "Skills", link: "#skills", icon: <GiSkills /> },
    { title: "Background", link: "#background", icon: <IoSchoolSharp /> },
    { title: "Projects", link: "#projects", icon: <FaProjectDiagram /> },
    { title: "Contact", link: "#contact", icon: <BiSolidContact /> },
  ];

  return (
    <div
      className={
        shadow
          ? " bg-[rgba(37,61,25,0.8)] fixed w-full h-20 l z-[100] ease-in-out duration-700"
          : "fixed w-full h-20 z-[100] "
      }
    >
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
          <div onClick={handleNav} className="md:hidden hover:text-white">
            <AiOutlineMenu></AiOutlineMenu>
          </div>
        </div>
      </div>
      <div
        className={
          nav ? " md:hidden fixed left-0 top-0 w-full h-screen bg-black/90" : ""
        }
      >
        <div
          className={
            nav
              ? "md:hidden fixed left-0 top-[25%] w-[5%] sm:w-[5%] md:w-[5%] max-h-max-content rounded-xl bg-[rgb(11,11,11)] p-6 ease-in duration-600"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-600"
          }
        >
          <div className="py-2">
            <ul className="uppercase flex flex-col  items-center">
              {linksIcons.map((link) => {
                return (
                  <Link key={link.title} href={link.link}>
                    <li
                      onClick={() => {
                        setNav(false);
                      }}
                      className="py-3 text-2xl hover:text-purple-700 text-sky-700 "
                    >
                      {link.icon}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
