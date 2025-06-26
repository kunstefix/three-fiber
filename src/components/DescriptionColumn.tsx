import { motion } from "motion/react";
import { ANIMATION_CONFIG } from "../constants";

interface DescriptionColumnProps {
  description: string;
}

export const DescriptionColumn = ({ description }: DescriptionColumnProps) => (
  <motion.p
    className="text-white/80 text-center space-y-4 flex items-center justify-center"
    key={description}
    {...ANIMATION_CONFIG.fadeInDelayed(0.1)}
  >
    {description}
  </motion.p>
); 