import { PropertyType } from './PropertyTypes';

export interface PropertyFilter {
    type?: PropertyType;
    bedrooms?: number;
    bathrooms?: number;
    centerPoint?: { latitude: number, longitude: number };
    radius?: number; // in meters
}
