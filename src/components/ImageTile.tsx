import { motion } from "motion/react";
import { ANIMATION_CONFIG } from "../constants";

interface ImageTileProps {
  image: string;
  index: number;
  count: number;
  name: string;
}

export const ImageTile = ({ image, index, count, name }: ImageTileProps) => {
  const size = (() => {
    if (count === 1) return "h-40 w-72";
    if (count === 2) return "h-28 w-48"; 
    if (count <= 4) return "h-20 w-36";
    return "h-16 w-28";
  })();
  
  return (
    <motion.div
      key={index}
      className={`relative ${size}`}
    >
      <motion.div
        className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse"
        {...ANIMATION_CONFIG.imageFade}
      />
      <motion.img
        src={image}
        alt={`${name} image ${index + 1}`}
        className="absolute inset-0 h-full w-full rounded-lg object-cover"
        {...ANIMATION_CONFIG.imageScale(index)}
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.opacity = "1";
        }}
      />
    </motion.div>
  );
}; 