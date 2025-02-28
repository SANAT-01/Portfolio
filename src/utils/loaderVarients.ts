export const projectVariant = () => {
  return {
    hidden: {
      y: 150,
      opacity: 0.5,
    },

    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.1,
        ease: "easeOut",
      },
    },
  };
};

export const imageVariant = () => {
  return {
    hidden: {
      scale: 1.3,
    },

    visible: {
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut",
      },
    },
  };
};

export const loaderVariant = () => {
  return {
    hidden: {
      pathLength: 0,
      strokeWidth: 1,
      fill: "#0a192f",
    },

    visible: {
      pathLength: 1,
      fill: ["#0a192f", "#0a192f", "#e6f1ff"],
      strokeWidth: 1,
      transition: {
        duration: 5,
        ease: "easeOut",
      },
    },
  };
};
