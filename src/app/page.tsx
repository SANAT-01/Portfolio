"use client";

import PreloadMedia from "@/components/loader/preLoader";
import { media } from "@/constants/constants";
import App from "./app";

export default function Home() {
  return (
    <div id="portfolio">
      <PreloadMedia images={Object.values(media)}>
        <App />
      </PreloadMedia>
    </div>
  );
}
