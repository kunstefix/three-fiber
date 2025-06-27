import * as THREE from "three";
import React, { useState, useMemo, useEffect, type JSX } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

interface GenericGLBProps {
  glbPath: string;
  hoverColor?: string;
  hoverOpacity?: number;
  hoverEmissiveIntensity?: number;
  enableHover?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
  hidden?: boolean;
}

// Generic GLTF result type that can handle any model structure
type GenericGLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
  animations: GLTF["animations"];
};

export function GenericGLB({
  glbPath,
  hoverColor = "#ff6b6b",
  hoverOpacity = 0.8,
  hoverEmissiveIntensity = 0.2,
  enableHover = true,
  color,
  hidden, 
  ...props
}: GenericGLBProps & JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(glbPath) as unknown as GenericGLTFResult;
  const [isHovered, setIsHovered] = useState(false);

  const hoverMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: hoverColor,
      transparent: true,
      opacity: hoverOpacity,
      emissive: hoverColor,
      emissiveIntensity: hoverEmissiveIntensity,
    });
  }, [hoverColor, hoverOpacity, hoverEmissiveIntensity]);

  // Preload the GLB file
  useEffect(() => {
    useGLTF.preload(glbPath);
  }, [glbPath]);

  // Get the first mesh from nodes (assuming single mesh models)
  const firstMeshKey = Object.keys(nodes)[0];
  const firstMaterialKey = Object.keys(materials)[0];

  if (!firstMeshKey || !firstMaterialKey) {
    console.warn(`No mesh or material found in ${glbPath}`);
    return null;
  }

  const mesh = nodes[firstMeshKey];
  const material = materials[firstMaterialKey];

  if (hidden) {
    return null;
  }

  return (
    <group {...props} dispose={null} onClick={(e) => {
      e.stopPropagation();
      if (props.onClick) {
        props.onClick(e);
      }
    }}>
      <mesh
        geometry={mesh.geometry}
        material={isHovered && enableHover ? hoverMaterial : color ? new THREE.MeshStandardMaterial({ color }) : material}
        onPointerOver={(e) => {
          if (!enableHover) return;
          e.stopPropagation();
          setIsHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          if (!enableHover) return;
          e.stopPropagation();
          setIsHovered(false);
          document.body.style.cursor = "default";
        }}
      />
    </group>
  );
}
