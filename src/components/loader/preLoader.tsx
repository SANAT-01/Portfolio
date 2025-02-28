"use client";

import { useState, useEffect } from "react";
import Loader from "./loader";

interface PreloadMediaProps {
  images: string[];
  children: React.ReactNode;
}

const PreloadMedia: React.FC<PreloadMediaProps> = ({ images, children }) => {
  const [loaded, setLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);

  setTimeout(() => {
    setShowPreloader(true);
    setLoaded(true);
  }, 7000);

  useEffect(() => {
    let loadedImages = 0;
    const totalImages = images.length;

    const onLoad = () => {
      loadedImages++;
      if (loadedImages === totalImages && showPreloader) {
        setLoaded(true);
      }
    };

    images.forEach((imageSrc) => {
      const img = new window.Image();
      img.src = imageSrc;
      img.onload = onLoad;
    });
  }, [images, showPreloader]);

  if (!loaded) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default PreloadMedia;
