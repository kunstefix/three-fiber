import { useGLTF } from '@react-three/drei'

// Export a preload function for manual preloading
export const preloadGLB = (glbPath: string) => {
  useGLTF.preload(glbPath)
} 