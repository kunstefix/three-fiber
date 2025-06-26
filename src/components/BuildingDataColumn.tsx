import { motion } from "motion/react";
import { BuildingDataRow } from "./BuildingDataRow.tsx";
import { ANIMATION_CONFIG } from "../constants";

interface BuildingDataColumnProps {
  buildingData: Record<string, string | number | string[]>;
  objectId: string;
}

export const BuildingDataColumn = ({ buildingData, objectId }: BuildingDataColumnProps) => (
  <motion.div
    className="text-white/80 flex flex-col items-center justify-center"
    key={`building-data-${objectId}`}
    {...ANIMATION_CONFIG.fadeInDelayed(0.15)}
  >
    <h3 className="text-xl font-bold mb-4">Building Data</h3>
    <div className="space-y-2">
      {Object.entries(buildingData).map(([key, value], index) => (
        <BuildingDataRow key={key} keyName={key} value={value} index={index} />
      ))}
    </div>
  </motion.div>
); 