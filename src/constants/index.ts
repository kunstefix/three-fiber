import type { Object } from "../types";

export const ANIMATION_CONFIG = {
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

export const OBJECTS: Object[] = [
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
    images: ["https://picsum.photos/id/1/200/100"],
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
    images: ["https://picsum.photos/id/5/200/100"],
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
    images: ["https://picsum.photos/id/9/200/100"],
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
    images: ["https://picsum.photos/id/13/200/100", "https://picsum.photos/id/14/200/100"],
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
    images: ["https://picsum.photos/id/17/200/100", "https://picsum.photos/id/18/200/100", "https://picsum.photos/id/19/200/100"],
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
    images: ["https://picsum.photos/id/21/200/100"],
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
    images: ["https://picsum.photos/id/29/200/100", "https://picsum.photos/id/30/200/100", "https://picsum.photos/id/31/200/100", "https://picsum.photos/id/32/200/100"],
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
    images: ["https://picsum.photos/id/33/200/100", "https://picsum.photos/id/34/200/100", "https://picsum.photos/id/35/200/100", "https://picsum.photos/id/36/200/100"],
    position: [0, 0, 0],
    focusPosition: [1.14, 0.75, 0.66],
  },
]; 