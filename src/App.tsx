import "./App.css";
import { useState, useRef } from "react";
import * as THREE from "three";
import {
  /* CameraPositionDisplay, */
  Scene3D,
  NoObjectSelected,
  ObjectInfo,
} from "./components";
import type { Object } from "./types";

function App() {
  const [selectedObject, setSelectedObject] = useState<Object>();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetPosition = useRef([1, 0.4, 0.2]);
  const [/* cameraPosition */, setCameraPosition] = useState([1, 0.4, 0.2]);
  const [isInterpolating, setIsInterpolating] = useState(false);

  const handleObjectClick = (object: Object) => {
    setSelectedObject(object);
    targetPosition.current = object.focusPosition;
    setIsInterpolating(true);
  };

  return (
    <div className="w-full flex-1 h-full gap-4">
      {/* Canvas */}
      <div className="relative h-[70vh] bg-[#242424]">
       {/*  <CameraPositionDisplay position={cameraPosition} /> */}
        <Scene3D
          cameraRef={cameraRef}
          targetPosition={targetPosition}
          isInterpolating={isInterpolating}
          setIsInterpolating={setIsInterpolating}
          setCameraPosition={setCameraPosition}
          selectedObject={selectedObject}
          onObjectClick={handleObjectClick}
        />
      </div>

      {/* Info */}
      <div className="h-[50%] absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black from-60% to-transparent text-white flex flex-col items-center justify-center my-auto pointer-events-none">
          {!selectedObject ? (
            <NoObjectSelected />
          ) : (
            <ObjectInfo selectedObject={selectedObject} />
          )}
      </div>
    </div>
  );
}

export default App;
