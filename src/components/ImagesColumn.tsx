import { motion } from "motion/react";
import { ImageTile } from "./ImageTile.tsx";
import { ANIMATION_CONFIG } from "../constants";

interface ImagesColumnProps {
  images: string[];
  objectId: string;
  name: string;
}

export const ImagesColumn = ({ images, objectId, name }: ImagesColumnProps) => (
  <motion.div
    key={objectId}
    className="flex items-center justify-center h-full"
    {...ANIMATION_CONFIG.fadeInDelayed(0.2)}
  >
    <div
      className={`grid ${
        images.length === 1 ? "" : "grid-cols-2"
      } gap-4 justify-items-center`}
    >
      {images.map((image, index) => (
        <ImageTile 
          key={index}
          image={image}
          index={index}
          count={images.length}
          name={name}
        />
      ))}
    </div>
  </motion.div>
); 