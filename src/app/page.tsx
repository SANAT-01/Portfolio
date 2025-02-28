"use client";

import PreloadMedia from "@/components/loader/preLoader";
import { media } from "@/constants/constants";
import App from "./app";
import Script from "next/script";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const imageUrls = Object.values(media).map((item) => item.src);

  return (
    <div id="portfolio">
      <AnimatePresence>
        <PreloadMedia images={imageUrls}>
          <Script src="https://kit.fontawesome.com/c3b56a7551.js" />
          <App />
        </PreloadMedia>
      </AnimatePresence>
    </div>
  );
}
