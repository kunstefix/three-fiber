import React from 'react'
import { GenericGLB } from '../components/GenericGLB'

interface OuterRingInnerPassagesProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
}

export function Outer_Ring_Inner_Passages_Generic(props: OuterRingInnerPassagesProps) {
  return (
    <GenericGLB
      glbPath="/etherlaken-Outer_Ring_Inner_Passages-transformed.glb"
      enableHover={true}
      hoverColor="#ff6b6b"
      {...props}
    />
  )
} 