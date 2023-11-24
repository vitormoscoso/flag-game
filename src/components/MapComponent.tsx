import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
export default function MapComponent({ position }: any) {    
  return (
    <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY}>
      <Map zoom={4} center={position} mapId={import.meta.env.VITE_MAP_ID}>
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}
