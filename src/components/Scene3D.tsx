import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { GenericGLB } from "./GenericGLB";
import * as THREE from "three";
import { CameraInterpolation } from "./CameraInterpolation.tsx";
import type { Object } from "../types";
import { OBJECTS } from "../constants";

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
  onObjectClick
}: Scene3DProps) => (
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
      position={[1, 0.4, 0.2]}
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
        onClick={() => onObjectClick(object)}
        glbPath={object.path}
        enableHover={true}
        hoverColor="#ff6b6b"
        color={selectedObject?.id === object.id ? "#ff6b6b" : undefined}
      />
    ))}
  </Canvas>
); 