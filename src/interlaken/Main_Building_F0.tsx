/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 etherlaken-Main_Building_F0.gltf --transform -t -o ../src/interlaken/Main_Building_F0.tsx 
Files: etherlaken-Main_Building_F0.gltf [9.64KB] > /Users/klemenkunstek/Desktop/Akasha/map-threejs/render-app/src/interlaken/etherlaken-Main_Building_F0-transformed.glb [2.72KB] (72%)
*/

import * as THREE from 'three'
import { type JSX, useState, useMemo } from 'react'
import { useGLTF,  } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Main_Building_F0: THREE.Mesh
  }
  materials: {
    mat_0: THREE.MeshStandardMaterial
  }
  animations: GLTF['animations']
}


export function Main_Building_F0(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/etherlaken-Main_Building_F0-transformed.glb') as unknown as GLTFResult
  const [isHovered, setIsHovered] = useState(false)
  
  const hoverMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#ff6b6b",
      transparent: true,
      opacity: 0.8,
      emissive: "#ff6b6b",
      emissiveIntensity: 0.2
    })
  }, [])

  return (
    <group {...props} dispose={null}>
      <mesh 
        geometry={nodes.Main_Building_F0.geometry} 
        material={isHovered ? hoverMaterial : materials.mat_0}
        onPointerOver={(e) => {
          e.stopPropagation()
          setIsHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setIsHovered(false)
          document.body.style.cursor = 'default'
        }}
      />
    </group>
  )
}

useGLTF.preload('/etherlaken-Main_Building_F0-transformed.glb')
