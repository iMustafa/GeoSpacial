import { db } from '../db';
import { LocationGeometry } from '@maat/api-types';

export class LocationGeometryModel {
    static async findAll(): Promise<LocationGeometry[]> {
        return await db('location_geometries')
            .select(
                'id',
                'name',
                db.raw('ST_AsGeoJSON(geometry) as geometry')
            );
    }
}
