import { PropertyType } from "./PropertyTypes";

export interface CreatePropertyPayload {
    title: string;
    description?: string;
    price?: number;
    lat: number;
    lng: number;
    type: PropertyType;
    area: number;
    bedrooms: number;
    bathrooms: number;
}
