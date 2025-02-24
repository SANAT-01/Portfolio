"use client";

import globeJson from "@/assets/countries_110m.json";
import dynamic from "next/dynamic";

// Dynamically import Globe with no SSR
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false, // Disable server-side rendering
  loading: () => <div>Loading Globe...</div>,
});

// Define the types for our data
interface CityData {
  city: string;
  lat: number;
  lng: number;
  altitude: number;
  color: string;
}

// Define the type for the geometry properties
interface GeoProperties {
  abbrev_len: number;
  [key: string]: unknown;
}

interface GeoFeature {
  type: string;
  properties: GeoProperties;
  geometry: object;
}

const Page = () => {
  const myData: CityData[] = [
    {
      city: "Kolkata",
      lat: 22.5726,
      lng: 88.3639,
      altitude: 0.1,
      color: "#ff0000",
    },
  ];

  return (
    <div className="cursor-move mx-10 my-10 px-10">
      <Globe
        hexPolygonsData={globeJson.features as GeoFeature[]}
        hexPolygonColor={(geometry: object) => {
          const geoFeature = geometry as GeoFeature;
          return ["#76c85e", "#76c85e", "#76c85e", "#76c85e"][
            geoFeature.properties.abbrev_len % 4
          ];
        }}
        pointsData={myData}
        pointAltitude="altitude"
        pointColor="color"
      />
    </div>
  );
};

export default Page;
