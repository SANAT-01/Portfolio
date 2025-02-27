"use client";

import globeJson from "@/assets/countries_110m.json";
import { CityData, GeoFeature } from "@/types/globe";
import dynamic from "next/dynamic";

// Dynamically import Globe with no SSR
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false, // Disable server-side rendering
  loading: () => <div>Loading Globe...</div>,
});

// Define the types for our data

const Page = () => {
  const myData: CityData[] = [
    {
      city: "Kolkata",
      lat: 22.5726,
      lng: 88.3639,
      altitude: 0.5,
      color: "#ff0000",
    },
  ];

  return (
    <div className="cursor-move my-10">
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
        width={500}
        height={400}
      />
    </div>
  );
};

export default Page;
