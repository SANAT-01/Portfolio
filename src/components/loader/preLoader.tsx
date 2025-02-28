"use client";

import { useEffect } from "react";
import Loader from "./loader";

interface PreloadMediaProps {
  images: string[];
  loaded?: boolean;
  setLoaded: (loaded: boolean) => void;
}

const PreloadMedia: React.FC<PreloadMediaProps> = ({ images, setLoaded }) => {
  useEffect(() => {
    let loadedImages = 0;
    const totalImages = images.length;

    const onLoad = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        setLoaded(false);
      }
    };

    images.forEach((imageSrc) => {
      const img = new window.Image();
      img.src = imageSrc;
      img.onload = onLoad;
    });
  }, [images]);

  return <Loader />;
};

export default PreloadMedia;
