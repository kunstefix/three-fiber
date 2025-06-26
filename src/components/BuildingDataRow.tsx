import { motion } from "motion/react";
import { ANIMATION_CONFIG } from "../constants";

interface BuildingDataRowProps {
  keyName: string;
  value: string | number | string[];
  index: number;
}

export const BuildingDataRow = ({ keyName, value, index }: BuildingDataRowProps) => (
  <motion.div
    key={keyName}
    className="flex justify-between gap-4"
    {...ANIMATION_CONFIG.fadeInDelayed(0.1 * index)}
  >
    <span className="capitalize">{keyName.replace(/([A-Z])/g, ' $1').trim()}:</span>
    <span className="font-mono">
      {Array.isArray(value) ? value.join(', ') : value}
      {typeof value === 'number' && !keyName.toLowerCase().includes('year') && 
        ` ${keyName.toLowerCase().includes('area') ? 'm²' : 
           keyName.toLowerCase().includes('height') || 
           keyName.toLowerCase().includes('width') || 
           keyName.toLowerCase().includes('length') || 
           keyName.toLowerCase().includes('diameter') ? 'm' :
           keyName.toLowerCase().includes('weight') ? 'kg' : ''}`}
    </span>
  </motion.div>
); 