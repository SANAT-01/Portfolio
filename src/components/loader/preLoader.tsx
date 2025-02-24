"use client";

import { useState, useEffect } from "react";
import Loader from "./loader";

interface PreloadMediaProps {
  images: string[];
  children: React.ReactNode;
}

const PreloadMedia: React.FC<PreloadMediaProps> = ({ images, children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedImages = 0;
    const totalImages = images.length;

    const onLoad = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        setLoaded(true);
      }
    };

    images.forEach((imageSrc) => {
      const img = new window.Image();
      img.src = imageSrc;
      onLoad();
      // img.onload = onLoad;
    });
  }, [images]);

  if (!loaded) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default PreloadMedia;
