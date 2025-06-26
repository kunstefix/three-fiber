import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Etherlaken-Main_Building_F0";
//import { Model } from "./Samplebuilding";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";

function App() {
  const [toggle, setToggle] = useState(false);
  
  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <Canvas camera={{ position: [0, 0, 100] }} style={{ width: "100vw", height: "100vh" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
