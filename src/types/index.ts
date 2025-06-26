export interface Object {
  id: string;
  path: string;
  name: string;
  description: string;
  buildingData: Record<string, string | number | string[]>;
  images: string[];
  position: [number, number, number];
  focusPosition: [number, number, number];
} 