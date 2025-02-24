"use client";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";
import Background from "@/pages/Background";
import Skills from "@/pages/Skills";
import Main from "@/pages/Main";
import Navigation from "@/pages/Navigation";
import { useEffect, useRef } from "react";

const App = () => {
  const instance = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptTag = document.createElement("script");
    scriptTag.src = `https://kit.fontawesome.com/c3b56a7551.js`;
    scriptTag.async = true;
    instance?.current?.appendChild(scriptTag);
  }, [instance]);
  return (
    <>
      <div className="" ref={instance}>
        <Navigation />
        <Main />
        <About />
        <Skills />
        <Background />
        <Projects />
        <Contact />
      </div>
    </>
  );
};

export default App;
