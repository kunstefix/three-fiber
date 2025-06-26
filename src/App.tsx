import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { GenericGLB } from "./components/GenericGLB";

const OBJECTS = [
  "/etherlaken-Main_Building_F0-transformed.glb",
  "/etherlaken-Main_Building_F0_roof-transformed.glb",
  "/etherlaken-Main_Building_F1-transformed.glb",
  "/etherlaken-Main_Building_F1_Roof-transformed.glb",
  "/etherlaken-Main_Building_Tower-transformed.glb",
  "/etherlaken-Main_Building_Tower_Ball-transformed.glb",
  "/etherlaken-Outer_Ring-transformed.glb",
  "/etherlaken-Outer_Ring_Inner_Passages-transformed.glb",
];

function App() {
  const [toggle, setToggle] = useState(false);


  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <Canvas
        camera={{ position: [2, 4, 2] }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={0.8} castShadow />
        <hemisphereLight intensity={0.1} groundColor="black" />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        {OBJECTS.map((object) => (
          <GenericGLB
            glbPath={object}
            enableHover={true}
            hoverColor="#ff6b6b"
          />
        ))}
      </Canvas>
    </div>
  );
}

export default App;
