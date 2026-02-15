import { db } from '../db';
import { Property, CreatePropertyPayload, PropertyFilter } from '@maat/api-types';

export class PropertyModel {
    static async findAll(filters: PropertyFilter = {}): Promise<Property[]> {
        const query = db('properties')
            .select(
                'properties.id',
                'properties.title',
                'properties.description',
                'properties.price',
                'properties.type',
                'properties.area',
                'properties.bedrooms',
                'properties.bathrooms',
                db.raw('ST_AsGeoJSON(properties.location) as location')
            )

        if (filters.type) {
            query.where('properties.type', filters.type);
        }

        if (filters.bedrooms) {
            query.where('properties.bedrooms', filters.bedrooms);
        }

        if (filters.bathrooms) {
            query.where('properties.bathrooms', filters.bathrooms);
        }

        if (filters.centerPoint && filters.radius) {
            query.whereRaw(
                'ST_Distance_Sphere(properties.location, ST_GeomFromText(?, 4326)) <= ?',
                [`POINT(${filters.centerPoint.longitude} ${filters.centerPoint.latitude})`, filters.radius]
            );
        }

        return await query;
    }

    static async create(data: CreatePropertyPayload): Promise<Property> {
        const { title, description, price, lat, lng, type, area, bedrooms, bathrooms } = data;

        return await db('properties').insert({
            title,
            description: description || '',
            price: price || 0,
            type,
            area,
            bedrooms,
            bathrooms,
            location: db.raw('ST_GeomFromText(?, 4326)', [`POINT(${lng} ${lat})`])
        });
    }

    static async findInPolygon(geometryId: string | number, filters: PropertyFilter = {}): Promise<Property[]> {
        const query = db('properties')
            .select(
                'properties.id',
                'properties.title',
                'properties.description',
                'properties.price',
                'properties.type',
                'properties.area',
                'properties.bedrooms',
                'properties.bathrooms',
                db.raw('ST_AsGeoJSON(properties.location) as location')
            )
            .join('location_geometries', function () {
                this.onVal('location_geometries.id', geometryId);
            })
            .whereRaw('ST_Contains(location_geometries.geometry, properties.location)');

        if (filters.type) {
            query.where('properties.type', filters.type);
        }

        if (filters.bedrooms) {
            query.where('properties.bedrooms', filters.bedrooms);
        }

        if (filters.bathrooms) {
            query.where('properties.bathrooms', filters.bathrooms);
        }

        return await query;
    }
}
