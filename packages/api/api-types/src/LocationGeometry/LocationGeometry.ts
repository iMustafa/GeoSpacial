export interface LocationGeometry {
    id: number;
    name: string;
    geometry: {
        type: 'Polygon';
        coordinates: number[][][]; // GeoJSON-like structure for Polygon
    };
}