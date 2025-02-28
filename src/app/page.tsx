"use client";

import PreloadMedia from "@/components/loader/preLoader";
import { media } from "@/constants/constants";
import App from "./app";
import Script from "next/script";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const imageUrls = Object.values(media).map((item) => item.src);
  const [showPreloader, setShowPreloader] = useState(true);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="portfolio">
      <Script src="https://kit.fontawesome.com/c3b56a7551.js" />
      <AnimatePresence>
        {(showPreloader || loader) && (
          <PreloadMedia images={imageUrls} setLoaded={setLoader} />
        )}
      </AnimatePresence>
      <App />
    </div>
  );
}
