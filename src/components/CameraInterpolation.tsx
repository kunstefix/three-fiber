import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraInterpolationProps {
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;
  targetPosition: React.MutableRefObject<number[]>;
  isInterpolating: boolean;
  setIsInterpolating: (value: boolean) => void;
  setCameraPosition: (position: number[]) => void;
}

export const CameraInterpolation = ({
  cameraRef,
  targetPosition,
  isInterpolating,
  setIsInterpolating,
  setCameraPosition
}: CameraInterpolationProps) => {
  useFrame(() => {
    if (cameraRef.current && isInterpolating) {
      cameraRef.current.position.x +=
        (targetPosition.current[0] - cameraRef.current.position.x) * 0.05;
      cameraRef.current.position.y +=
        (targetPosition.current[1] - cameraRef.current.position.y) * 0.05;
      cameraRef.current.position.z +=
        (targetPosition.current[2] - cameraRef.current.position.z) * 0.05;

      const distance = Math.sqrt(
        Math.pow(targetPosition.current[0] - cameraRef.current.position.x, 2) +
        Math.pow(targetPosition.current[1] - cameraRef.current.position.y, 2) +
        Math.pow(targetPosition.current[2] - cameraRef.current.position.z, 2)
      );

      if (distance < 0.01) {
        setIsInterpolating(false);
      }
    }

    if (cameraRef.current) {
      setCameraPosition([
        cameraRef.current.position.x,
        cameraRef.current.position.y,
        cameraRef.current.position.z,
      ]);
    }
  });
  return null;
}; 