import { useEffect, useState, useRef } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import Image from "next/image"; // Import Next.js Image component

interface ImageSliderProps {
  images: ImageType[];
}

interface ImageType {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [index, setIndex] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const imageRef = useRef(null);

  // Effect to change the image index every 3 seconds when the image is in the viewport
  useEffect(() => {
    const interval = setInterval(() => {
      if (isInViewport) {
        setIndex((i) => (i + 1) % images.length); // Loop through images
      }
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval
  }, [images, isInViewport]);

  // Intersection observer to detect if the image is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current); // Observe the image container
    }

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  // Get the current image object
  const currentImage = images[index];
  //   console.log(currentImage);

  return (
    <div className="py-6">
      <LazyMotion features={domAnimation}>
        <m.div
          ref={imageRef}
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="w-full h-full blob drop-shadow-div"
        >
          {/* Use Next.js Image component */}
          <Image
            src={currentImage.src}
            alt="Slider Image"
            width={300}
            height={300}
            placeholder="blur"
            blurDataURL={currentImage.blurDataURL}
            className="object-cover w-full h-full"
          />
        </m.div>
      </LazyMotion>
    </div>
  );
};

export default ImageSlider;
