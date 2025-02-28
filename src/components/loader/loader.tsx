"use client";
import React from "react";
import styles from "@/styles/preloader.module.scss";
import { motion } from "framer-motion";
import { loaderVariant } from "@/utils/loaderVarients";

export default function Preloader() {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 2 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={styles.preloader}
    >
      <motion.svg
        width="175"
        height="322"
        viewBox="0 0 25 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={loaderVariant()}
          stroke="#e6f1ff"
          d="M10.6699 38.2188V34.3164C8.4082 34.1172 6.58008 33.2793 5.18555 31.8027C3.60352 30.127 2.8125 28.1641 2.8125 25.9141L6.15234 24.332H6.32812V27.0039C6.32812 28.4336 6.75 29.6348 7.59375 30.6074C8.41406 31.5566 9.43945 32.1309 10.6699 32.3301V20.7461C8.95898 20.5469 7.45312 19.8613 6.15234 18.6895C4.98047 17.6348 4.39453 16.1055 4.39453 14.1016C4.39453 11.7344 5.12109 9.96484 6.57422 8.79297C7.72266 7.86719 9.08789 7.32227 10.6699 7.1582V4.11719L12.5332 3.23828H12.709V7.1582C14.291 7.32227 15.6562 7.86719 16.8047 8.79297C18.2578 9.96484 18.9844 11.5879 18.9844 13.6621L15.6445 15.2441H15.4688V12.9941C15.4688 11.6699 15.0879 10.6738 14.3262 10.0059C13.8457 9.58398 13.3066 9.30273 12.709 9.16211V17.6699C15.0527 17.8105 16.8809 18.4668 18.1934 19.6387C19.7637 21.0449 20.5488 23.0664 20.5488 25.7031C20.5488 28.1055 19.7637 30.1387 18.1934 31.8027C16.7988 33.2793 14.9707 34.1172 12.709 34.3164V37.3398L10.8457 38.2188H10.6699ZM10.6699 17.5469V9.14453C9.99023 9.29688 9.41602 9.61914 8.94727 10.1113C8.25586 10.8379 7.91016 12.0801 7.91016 13.8379C7.91016 14.998 8.17383 15.8711 8.70117 16.457C9.20508 17.0195 9.86133 17.3828 10.6699 17.5469ZM12.709 20.8516V32.3301C13.9277 32.1309 14.9531 31.5566 15.7852 30.6074C16.6172 29.6582 17.0332 28.0352 17.0332 25.7383C17.0332 24.3555 16.6934 23.2598 16.0137 22.4512C15.252 21.5488 14.1504 21.0156 12.709 20.8516Z"
          fill="#CCC6C6"
        />
      </motion.svg>
    </motion.div>
  );
}
