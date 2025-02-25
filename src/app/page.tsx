"use client";

import PreloadMedia from "@/components/loader/preLoader";
import { media } from "@/constants/constants";
import App from "./app";
import Script from "next/script";

export default function Home() {
  const imageUrls = Object.values(media).map((item) => item.src);

  return (
    <div id="portfolio">
      <PreloadMedia images={imageUrls}>
        <Script src="https://kit.fontawesome.com/c3b56a7551.js" />
        <App />
      </PreloadMedia>
    </div>
  );
}
