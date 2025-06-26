import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useState, useRef } from "react";
import { GenericGLB } from "./components/GenericGLB";
import { AnimatePresence, motion } from "motion/react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ANIMATION_CONFIG = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
  fadeInDelayed: (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, delay },
  }),
  imageFade: {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
    exit: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  imageScale: (index: number) => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3, delay: 0.1 * index },
  }),
};

const getRandomImages = (id: number, count: number) => {
  return Array.from({ length: count }, () => `https://picsum.photos/id/${id}/200/100`);
};

const OBJECTS = [
  {
    id: "Main_Building_F0",
    path: "/etherlaken-Main_Building_F0-transformed.glb",
    name: "Main Building",
    description:
      "The main building of the city, featuring elegant architecture and serving as the central hub. This ground floor level contains the main entrance hall and public spaces.",
    buildingData: {
      area: 2500,
      height: 4.5,
      capacity: 500,
      yearBuilt: 1892
    },
    images: getRandomImages(1, 1),
    position: [0, 0, 0],
    focusPosition: [0.75, 1.13, 0.19],
  },
  {
    id: "Main_Building_F0_roof",
    path: "/etherlaken-Main_Building_F0_roof-transformed.glb",
    name: "Main Building Roof",
    description:
      "The ornate roof of the main building's ground floor, featuring traditional Swiss architectural elements with decorative eaves and detailed woodwork.",
    buildingData: {
      area: 2700,
      height: 3,
      roofPitch: 45,
      materials: ["Timber", "Slate", "Copper"]
    },
    images: getRandomImages(5, 1),
    position: [0, 0, 0],
    focusPosition: [2, 1.5, 0.5],
  },
  {
    id: "Main_Building_F1",
    path: "/etherlaken-Main_Building_F1-transformed.glb",
    name: "Main Building F1",
    description:
      "The first floor of the main building houses administrative offices and meeting rooms. The space features large windows providing panoramic views of the surrounding area.",
    buildingData: {
      area: 2200,
      height: 4,
      offices: 24,
      meetingRooms: 8
    },
    images: getRandomImages(9, 1),
    position: [0, 0, 0],
    focusPosition: [2, 2, 0.5],
  },
  {
    id: "Main_Building_F1_Roof",
    path: "/etherlaken-Main_Building_F1_Roof-transformed.glb",
    name: "Main Building F1 Roof",
    description:
      "The upper roof section covering the first floor, designed with steep angles typical of Alpine architecture to handle heavy snowfall. Features copper guttering and traditional ornamentation.",
    buildingData: {
      area: 2400,
      height: 3.5,
      roofPitch: 50,
      snowLoadCapacity: 400
    },
    images: getRandomImages(13, 2),
    position: [0, 0, 0],
    focusPosition: [2, 2.5, 0.5],
  },
  {
    id: "Main_Building_Tower",
    path: "/etherlaken-Main_Building_Tower-transformed.glb",
    name: "Main Building Tower",
    description:
      "The iconic tower rising from the main building, serving as both a architectural focal point and observation point. The tower's design incorporates elements of Swiss Gothic architecture with modern touches.",
    buildingData: {
      height: 45,
      baseArea: 100,
      observationDeckHeight: 40,
      stairs: 225
    },
    images: getRandomImages(17, 3),
    position: [0, 0, 0],
    focusPosition: [2, 3, 0.5],
  },
  {
    id: "Main_Building_Tower_Ball",
    path: "/etherlaken-Main_Building_Tower_Ball-transformed.glb",
    name: "Main Building Tower Ball",
    description:
      "The distinctive golden sphere atop the tower, serving as both an architectural flourish and weather vane. The ball is covered in gold leaf and catches sunlight throughout the day.",
    buildingData: {
      diameter: 2.5,
      goldLeafArea: 19.6,
      weight: 300
    },
    images: getRandomImages(21, 1),
    position: [0, 0, 0],
    focusPosition: [0.79, 1.39, 0.2],
  },
  {
    id: "Outer_Ring",
    path: "/etherlaken-Outer_Ring-transformed.glb",
    name: "Outer Ring",
    description:
      "The circular promenade surrounding the main building, featuring covered walkways, shops, and gathering spaces. The ring's design creates a natural flow of foot traffic and provides shelter from weather.",
    buildingData: {
      length: 400,
      width: 8,
      area: 3200,
      shopUnits: 24,
      seatingCapacity: 200
    },
    images: getRandomImages(25, 8),
    position: [0, 0, 0],
    focusPosition: [0.35, 2.16, 0.19],
  },
  {
    id: "Outer_Ring_Inner_Passages",
    path: "/etherlaken-Outer_Ring_Inner_Passages-transformed.glb",
    name: "Outer Ring Inner Passages",
    description:
      "A network of covered corridors connecting different sections of the outer ring to the main building. These passages feature glass ceilings, allowing natural light while protecting from weather.",
    buildingData: {
      length: 160,
      width: 4,
      area: 640,
      glassRoofArea: 580,
      connectingPoints: 8
    },
    images: getRandomImages(29, 4),
    position: [0, 0, 0],
    focusPosition: [1.14, 0.75, 0.66],
  },
];

function App() {
  const [selectedObject, setSelectedObject] = useState<(typeof OBJECTS)[0]>();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetPosition = useRef([1, 0.4, 0.2]);
  const [cameraPosition, setCameraPosition] = useState([1, 0.4, 0.2]);
  const [isInterpolating, setIsInterpolating] = useState(false);

  const handleObjectClick = (object: (typeof OBJECTS)[0]) => {
    setSelectedObject(object);
    targetPosition.current = object.focusPosition;
    setIsInterpolating(true);
  };

  return (
    <div className="w-full flex-1 h-full gap-4">
      {/* Canvas */}
      <div className="relative h-[70vh] bg-[#242424]">
        <CameraPositionDisplay position={cameraPosition} />
        <Scene3D
          cameraRef={cameraRef}
          targetPosition={targetPosition}
          isInterpolating={isInterpolating}
          setIsInterpolating={setIsInterpolating}
          setCameraPosition={setCameraPosition}
          selectedObject={selectedObject}
          onObjectClick={handleObjectClick}
        />
      </div>

      {/* Info */}
      <div className="h-[50%] absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black from-60% to-transparent text-white">
        {!selectedObject ? (
          <NoObjectSelected />
        ) : (
          <ObjectInfo selectedObject={selectedObject} />
        )}
      </div>
    </div>
  );
}

const CameraPositionDisplay = ({ position }: { position: number[] }) => (
  <div className="absolute top-2 left-2 bg-black/50 text-white p-2 rounded z-10">
    Camera Position:
    <br />[ {position[0].toFixed(2)}, {position[1].toFixed(2)}
    , {position[2].toFixed(2)} ]
  </div>
);

const Scene3D = ({
  cameraRef,
  targetPosition,
  isInterpolating,
  setIsInterpolating,
  setCameraPosition,
  selectedObject,
  onObjectClick
}: {
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
  targetPosition: React.MutableRefObject<number[]>;
  isInterpolating: boolean;
  setIsInterpolating: (value: boolean) => void;
  setCameraPosition: (position: number[]) => void;
  selectedObject: (typeof OBJECTS)[0] | undefined;
  onObjectClick: (object: (typeof OBJECTS)[0]) => void;
}) => (
  <Canvas>
    <CameraInterpolation
      cameraRef={cameraRef}
      targetPosition={targetPosition}
      isInterpolating={isInterpolating}
      setIsInterpolating={setIsInterpolating}
      setCameraPosition={setCameraPosition}
    />

    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[1, 0.4, 0.2]}
    />
    <ambientLight intensity={0.5} />
    <directionalLight position={[1, 1, 1]} intensity={12} castShadow />
    <hemisphereLight intensity={0.1} groundColor="black" />
    <directionalLight
      position={[10, 10, 10]}
      intensity={1.5}
      color="#FDB813"
      castShadow
    />
    <OrbitControls makeDefault enableDamping={false} />
    {OBJECTS.map((object) => (
      <GenericGLB
        key={object.id}
        onClick={() => onObjectClick(object)}
        glbPath={object.path}
        enableHover={true}
        hoverColor="#ff6b6b"
        color={selectedObject?.id === object.id ? "#ff6b6b" : undefined}
      />
    ))}
  </Canvas>
);

const CameraInterpolation = ({
  cameraRef,
  targetPosition,
  isInterpolating,
  setIsInterpolating,
  setCameraPosition
}: {
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
  targetPosition: React.MutableRefObject<number[]>;
  isInterpolating: boolean;
  setIsInterpolating: (value: boolean) => void;
  setCameraPosition: (position: number[]) => void;
}) => {
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

    setCameraPosition([
      cameraRef.current!.position.x,
      cameraRef.current!.position.y,
      cameraRef.current!.position.z,
    ]);
  });
  return null;
};

const NoObjectSelected = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h2 className="text-2xl font-bold mb-2">
      Select an object to view more information
    </h2>
  </div>
);

const ObjectInfo = ({ selectedObject }: { selectedObject: (typeof OBJECTS)[0] }) => (
  <div className="flex flex-col items-center justify-center flex-1 mx-30">
    <ObjectTitle name={selectedObject.name} />
    <AnimatePresence mode="wait">
      <div className="grid grid-cols-3 gap-8 h-full">
        <DescriptionColumn description={selectedObject.description} />
        <BuildingDataColumn buildingData={selectedObject.buildingData} objectId={selectedObject.id} />
        {selectedObject.images && (
          <ImagesColumn images={selectedObject.images} objectId={selectedObject.id} name={selectedObject.name} />
        )}
      </div>
    </AnimatePresence>
  </div>
);

const ObjectTitle = ({ name }: { name: string }) => (
  <h2 className="text-4xl font-bold mb-8 mt-20">
    <AnimatePresence mode="wait">
      <motion.span key={name} {...ANIMATION_CONFIG.fadeIn}>
        {name}
      </motion.span>
    </AnimatePresence>
  </h2>
);

const DescriptionColumn = ({ description }: { description: string }) => (
  <motion.p
    className="text-white/80 text-center space-y-4 flex items-center justify-center"
    key={description}
    {...ANIMATION_CONFIG.fadeInDelayed(0.1)}
  >
    {description}
  </motion.p>
);

const BuildingDataColumn = ({ buildingData, objectId }: { buildingData: Record<string, any>, objectId: string }) => (
  <motion.div
    className="text-white/80 flex flex-col items-center justify-center"
    key={`building-data-${objectId}`}
    {...ANIMATION_CONFIG.fadeInDelayed(0.15)}
  >
    <h3 className="text-xl font-bold mb-4">Building Data</h3>
    <div className="space-y-2">
      {Object.entries(buildingData).map(([key, value], index) => (
        <BuildingDataRow key={key} keyName={key} value={value} index={index} />
      ))}
    </div>
  </motion.div>
);

const BuildingDataRow = ({ keyName, value, index }: { keyName: string, value: any, index: number }) => (
  <motion.div
    key={keyName}
    className="flex justify-between gap-4"
    {...ANIMATION_CONFIG.fadeInDelayed(0.1 * index)}
  >
    <span className="capitalize">{keyName.replace(/([A-Z])/g, ' $1').trim()}:</span>
    <span className="font-mono">
      {Array.isArray(value) ? value.join(', ') : value}
      {typeof value === 'number' && !keyName.toLowerCase().includes('year') && 
        ` ${keyName.toLowerCase().includes('area') ? 'm²' : 
           keyName.toLowerCase().includes('height') || 
           keyName.toLowerCase().includes('width') || 
           keyName.toLowerCase().includes('length') || 
           keyName.toLowerCase().includes('diameter') ? 'm' :
           keyName.toLowerCase().includes('weight') ? 'kg' : ''}`}
    </span>
  </motion.div>
);

const ImagesColumn = ({ images, objectId, name }: { images: string[], objectId: string, name: string }) => (
  <motion.div
    key={objectId}
    className="flex items-center justify-center h-full"
    {...ANIMATION_CONFIG.fadeInDelayed(0.2)}
  >
    <div
      className={`grid ${
        images.length === 1 ? "" : "grid-cols-2"
      } gap-4 justify-items-center`}
    >
      {images.map((image, index) => (
        <ImageTile 
          key={index}
          image={image}
          index={index}
          count={images.length}
          name={name}
        />
      ))}
    </div>
  </motion.div>
);

const ImageTile = ({ image, index, count, name }: { image: string, index: number, count: number, name: string }) => {
  const size = (() => {
    if (count === 1) return "h-48 w-80";
    if (count === 2) return "h-32 w-56";
    if (count <= 4) return "h-24 w-40";
    return "h-20 w-32";
  })();
  
  return (
    <motion.div
      key={index}
      className={`relative ${size}`}
    >
      <motion.div
        className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse"
        {...ANIMATION_CONFIG.imageFade}
      />
      <motion.img
        src={image}
        alt={`${name} image ${index + 1}`}
        className="absolute inset-0 h-full w-full rounded-lg object-cover"
        {...ANIMATION_CONFIG.imageScale(index)}
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.opacity = "1";
        }}
      />
    </motion.div>
  );
};

export default App;
