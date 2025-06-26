interface CameraPositionDisplayProps {
  position: number[];
}

export const CameraPositionDisplay = ({ position }: CameraPositionDisplayProps) => (
  <div className="absolute top-2 left-2 bg-black/50 text-white p-2 rounded z-10">
    Camera Position:
    <br />[ {position[0].toFixed(2)}, {position[1].toFixed(2)}
    , {position[2].toFixed(2)} ]
  </div>
); 