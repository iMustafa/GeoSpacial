import { LocationPoint } from '../LocationPoint/LocationPoint';
import { PropertyType } from './PropertyTypes';

export interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    location: LocationPoint;
    type: PropertyType;
    area: number;
    bedrooms: number;
    bathrooms: number;
    created_at?: string;
    updated_at?: string;
}

export interface PropertyRaw {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    type: PropertyType;
    area: number;
    bedrooms: number;
    bathrooms: number;
    created_at?: string;
    updated_at?: string;
}
