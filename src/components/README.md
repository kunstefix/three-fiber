# GenericGLB Component

A reusable React Three.js component that can load any GLB file by passing the path as a prop.

## Usage

```tsx
import { GenericGLB } from './components/GenericGLB'

// Basic usage
<GenericGLB glbPath="/path/to/your/model.glb" />

// With hover effects
<GenericGLB 
  glbPath="/path/to/your/model.glb"
  enableHover={true}
  hoverColor="#ff6b6b"
  hoverOpacity={0.8}
  hoverEmissiveIntensity={0.2}
/>

// With positioning
<GenericGLB 
  glbPath="/path/to/your/model.glb"
  position={[0, 0, 0]}
  rotation={[0, 0, 0]}
  scale={[1, 1, 1]}
/>
```

## Props

- `glbPath` (required): Path to the GLB file
- `hoverColor` (optional): Color for hover effect (default: "#ff6b6b")
- `hoverOpacity` (optional): Opacity for hover effect (default: 0.8)
- `hoverEmissiveIntensity` (optional): Emissive intensity for hover effect (default: 0.2)
- `enableHover` (optional): Enable/disable hover effects (default: true)
- `position` (optional): Position as [x, y, z] array
- `rotation` (optional): Rotation as [x, y, z] array in radians
- `scale` (optional): Scale as [x, y, z] array

## Features

- **Automatic Preloading**: The component automatically preloads the GLB file
- **Hover Effects**: Built-in hover effects with customizable colors and opacity
- **Type Safety**: Full TypeScript support
- **Generic**: Works with any GLB file structure
- **Performance**: Uses React Three.js best practices

## Example: Converting Existing Components

Instead of having specific components like:

```tsx
// Before: Specific component
export function Outer_Ring_Inner_Passages(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/etherlaken-Outer_Ring_Inner_Passages-transformed.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Ring_Passages.geometry} material={materials.mat_0} />
    </group>
  )
}
```

You can now use:

```tsx
// After: Generic component
export function Outer_Ring_Inner_Passages(props: OuterRingInnerPassagesProps) {
  return (
    <GenericGLB
      glbPath="/etherlaken-Outer_Ring_Inner_Passages-transformed.glb"
      enableHover={true}
      hoverColor="#ff6b6b"
      {...props}
    />
  )
}
```

## Manual Preloading

If you need to preload GLB files manually, you can use the utility function:

```tsx
import { preloadGLB } from './utils/glbUtils'

// Preload a GLB file
preloadGLB('/path/to/your/model.glb')
``` 