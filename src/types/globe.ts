export interface CityData {
  city: string;
  lat: number;
  lng: number;
  altitude: number;
  color: string;
}

// Define the type for the geometry properties
export interface GeoProperties {
  abbrev_len: number;
  [key: string]: unknown;
}

export interface GeoFeature {
  type: string;
  properties: GeoProperties;
  geometry: object;
}
