"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SocialLinks from "../Contact/socialLinks";

interface LinksProps {
  handleToggle: () => void;
  isSidebarOpened: boolean;
}

const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const linksList = [
  {
    label: "Home",
    value: "home",
  },
  {
    label: "About",
    value: "about",
  },
  {
    label: "Skills",
    value: "skills",
  },

  {
    label: "Background",
    value: "background",
  },
  {
    label: "Projects",
    value: "projects",
  },
  {
    label: "Contact",
    value: "contact",
  },
];

const linkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

const Links = ({ handleToggle, isSidebarOpened }: LinksProps) => {
  const router = useRouter();

  return (
    <motion.div
      variants={variants}
      className={
        "absolute w-full h-full flex flex-col items-center justify-center gap-5"
      }
    >
      {isSidebarOpened &&
        linksList.map((item) => (
          <>
            <div
              key={item.value}
              className="text-xl py-4 md:text-4xl hover:scale-110 hover:transition-transform w-full flex justify-center cursor-pointer bg-green-400"
              onClick={() => {
                router.push(`#${item.value}`);
                handleToggle();
              }}
            >
              <motion.span
                variants={linkVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                {item.label}
              </motion.span>
            </div>
          </>
        ))}
      {isSidebarOpened && <SocialLinks />}
    </motion.div>
  );
};

export default Links;
