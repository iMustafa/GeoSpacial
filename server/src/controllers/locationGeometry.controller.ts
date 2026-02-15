import { Request, Response, NextFunction } from 'express';
import { LocationGeometryModel } from '../models/locationGeometry.model';

export const getLocationGeometries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const locationGeometries = await LocationGeometryModel.findAll();
        // Parse geometry from string to JSON if needed, though knex raw might return it as string depending on driver.
        // Assuming ST_AsGeoJSON returns a string representation of JSON.
        // Usually, libraries might need parsing, but let's see how property.model handled it.
        // The property model just returned it. If the client expects an object, we might need to parse it if the DB driver returns a string. 
        // However, matching the pattern in property.model.ts, we will just return it directly.
        // One detail: In property.model.ts: db.raw('ST_AsGeoJSON(properties.location) as location')
        // Let's assume the client or the driver handles the parsing or it's returned as JSON compatible.
        // Actually, ST_AsGeoJSON returns a string. We should probably parse it if we want it to be an object in the JSON response, 
        // OR the frontend expects a JSON string.
        // Looking at property.controller.ts, it just does res.json(properties).

        // Let's stick to the pattern. The LocationGeometry interface expects geometry: { type: 'Polygon', coordinates: ... }
        // If ST_AsGeoJSON returns a string, we might need to JSON.parse it.
        // But for now, I will follow the pattern. If it's a string in the interface, it's fine.
        // Wait, the interface says: geometry: { type: 'Polygon'; coordinates: number[][][]; };
        // If the DB returns a string, this won't match.
        // Let's check if there is any parsing in property.model.ts
        // No parsing in property.model.ts.
        // Maybe the knex driver or some middleware handles it? Or maybe the property interface expects a string?
        // Let's check Property interface.

        const parsedGeometries = locationGeometries.map(g => ({
            ...g,
            geometry: typeof g.geometry === 'string' ? JSON.parse(g.geometry) : g.geometry
        }));

        res.json(parsedGeometries);
    } catch (error) {
        next(error);
    }
};
