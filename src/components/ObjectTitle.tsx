import { AnimatePresence, motion } from "motion/react";
import { ANIMATION_CONFIG } from "../constants";

interface ObjectTitleProps {
  name: string;
}

export const ObjectTitle = ({ name }: ObjectTitleProps) => (
  <h2 className="text-4xl font-bold mb-8 mt-20">
    <AnimatePresence mode="wait">
      <motion.span key={name} {...ANIMATION_CONFIG.fadeIn}>
        {name}
      </motion.span>
    </AnimatePresence>
  </h2>
); 