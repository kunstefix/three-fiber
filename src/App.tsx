import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Main_Building_F0 } from "./interlaken/Main_Building_F0";
import { Main_Building_F0_roof } from "./interlaken/Main_Building_F0_roof";
import { Main_Building_F1 } from "./interlaken/Main_Building_F1";
import { Main_Building_F1_Roof } from "./interlaken/Main_Building_F1_Roof";
import { Main_Building_Tower_Ball } from "./interlaken/Main_Building_Tower_Ball";
import { Outer_Ring } from "./interlaken/Outer_Ring";
import { Outer_Ring_Inner_Passages } from "./interlaken/Outer_Ring_Inner_Passages";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { Main_Building_Tower } from "./interlaken/Main_Building_Tower";

function App() {
  const [toggle, setToggle] = useState(false);
  
  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <Canvas camera={{ position: [0, 0, 100] }} style={{ width: "100vw", height: "100vh" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Main_Building_F0 />
        <Main_Building_F0_roof />
        <Main_Building_F1 />
        <Main_Building_F1_Roof />
        <Main_Building_Tower />
        <Main_Building_Tower_Ball />
        <Outer_Ring />
        <Outer_Ring_Inner_Passages />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
