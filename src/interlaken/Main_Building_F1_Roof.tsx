/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 etherlaken-Main_Building_F1_Roof.gltf --transform -t -o ../src/interlaken/Main_Building_F1_Roof.tsx 
Files: etherlaken-Main_Building_F1_Roof.gltf [2.09KB] > /Users/klemenkunstek/Desktop/Akasha/map-threejs/render-app/src/interlaken/etherlaken-Main_Building_F1_Roof-transformed.glb [2.74KB] (-31%)
*/

import * as THREE from 'three'
import { type JSX } from 'react'
import { useGLTF,  } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Main_Building_F1_Roof: THREE.Mesh
  }
  materials: {
    mat_0: THREE.MeshStandardMaterial
  }
  animations: GLTF['animations']
}

export function Main_Building_F1_Roof(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/etherlaken-Main_Building_F1_Roof-transformed.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Main_Building_F1_Roof.geometry} material={materials.mat_0} />
    </group>
  )
}

useGLTF.preload('/etherlaken-Main_Building_F1_Roof-transformed.glb')
