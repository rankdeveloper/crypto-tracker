import type { Variants } from "framer-motion";

export const parentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.5,
      duration: 3,
      type: "spring",
      stiffness: 100,
      delayChildren: 2,
      staggerChildren: 0.2,
    },
  },
};

export const childVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};
