import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { GenericGLB } from "./GenericGLB";
import * as THREE from "three";
import { CameraInterpolation } from "./CameraInterpolation.tsx";
import type { Object } from "../types";
import { OBJECTS } from "../constants";
import { useState } from "react";

interface Scene3DProps {
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;
  targetPosition: React.MutableRefObject<number[]>;
  isInterpolating: boolean;
  setIsInterpolating: (value: boolean) => void;
  setCameraPosition: (position: number[]) => void;
  selectedObject: Object | undefined;
  onObjectClick: (object: Object) => void;
}

export const Scene3D = ({
  cameraRef,
  targetPosition,
  isInterpolating,
  setIsInterpolating,
  setCameraPosition,
  selectedObject,
  onObjectClick,
}: Scene3DProps) => {
  const [hiddenObjects, setHiddenObjects] = useState<string[]>([]);

  const handleObjectClick = (object: Object) => {
    console.log("clicked", object.id);
    onObjectClick(object);
    if (
      object.id === "Main_Building_F1_Roof" ||
      object.id === "Main_Building_F1"
    ) {
      setHiddenObjects(["Main_Building_F1_Roof"]);
    } else if (object.id === "Main_Building_F0") {
      setHiddenObjects([
        "Main_Building_F0_roof",
        "Main_Building_F1",
        "Main_Building_F1_Roof",
        "Main_Building_Tower_Ball",
        "Main_Building_Tower",
      ]);
    } else {
      setHiddenObjects([]);
    }
  };

  return (
    <Canvas>
      <CameraInterpolation
        cameraRef={cameraRef}
        targetPosition={targetPosition}
        isInterpolating={isInterpolating}
        setIsInterpolating={setIsInterpolating}
        setCameraPosition={setCameraPosition}
      />

      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[1.36, 0.54, 0.27]}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={12} castShadow />
      <hemisphereLight intensity={0.1} groundColor="black" />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1.5}
        color="#FDB813"
        castShadow
      />
      <OrbitControls makeDefault enableDamping={false} />
      {OBJECTS.map((object) => (
        <GenericGLB
          key={object.id}
          onClick={() => handleObjectClick(object)}
          glbPath={object.path}
          enableHover={true}
          hoverColor="#ff6b6b"
          color={selectedObject?.id === object.id ? "#ff6b6b" : undefined}
          hidden={hiddenObjects.includes(object.id)}
        />
      ))}
    </Canvas>
  );
};
