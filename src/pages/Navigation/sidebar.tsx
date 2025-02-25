"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Links from "./links";
import { ToggleButton } from "@/components/toogleButton";
import { cn } from "@/utils/cn";

const variants = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: {
      type: "spring",
      stiffness: 20,
    },
  },
  closed: {
    clipPath: "circle(24px at 48px 46px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Sidebar = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const handleToggle = () => {
    setIsSidebarOpened((pre) => !pre);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      animate={isSidebarOpened ? "open" : "closed"}
      className="flex flex-col items-center justify-center text-white"
    >
      <motion.div
        variants={variants}
        className={cn("z-40 inset-0 bg-white w-full md:w-96", {
          fixed: isLoaded,
        })}
      >
        <Links handleToggle={handleToggle} isSidebarOpened={isSidebarOpened} />
      </motion.div>

      <ToggleButton handleToggle={handleToggle} />
    </motion.div>
  );
};

export default Sidebar;
