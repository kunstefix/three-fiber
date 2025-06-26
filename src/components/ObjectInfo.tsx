import { AnimatePresence } from "motion/react";
import { ObjectTitle } from "./ObjectTitle.tsx";
import { DescriptionColumn } from "./DescriptionColumn.tsx";
import { BuildingDataColumn } from "./BuildingDataColumn.tsx";
import { ImagesColumn } from "./ImagesColumn.tsx";

interface ObjectInfoProps {
  selectedObject: {
    id: string;
    name: string;
    description: string;
    buildingData: Record<string, string | number | string[]>;
    images: string[];
  };
}

export const ObjectInfo = ({ selectedObject }: ObjectInfoProps) => (
  <div className="flex flex-col items-center justify-center flex-1 mx-30">
    <ObjectTitle name={selectedObject.name} />
    <AnimatePresence mode="wait">
      <div className="grid grid-cols-3 gap-8 h-full">
        {selectedObject.images && (
          <ImagesColumn
            images={selectedObject.images}
            objectId={selectedObject.id}
            name={selectedObject.name}
          />
        )}
        <DescriptionColumn description={selectedObject.description} />
        <BuildingDataColumn
          buildingData={selectedObject.buildingData}
          objectId={selectedObject.id}
        />
      </div>
    </AnimatePresence>
  </div>
);
