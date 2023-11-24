import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
// position: { lat: number; lng: number }
export default function MapComponent({ position }: any) {
  return (
    <APIProvider apiKey="AIzaSyC4rS5a0vNaYG_JQrwMbKt8RTbLEDP2Ntw">
      <Map zoom={4} center={position} mapId={"d2f54d88b626ff86"}>
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}
