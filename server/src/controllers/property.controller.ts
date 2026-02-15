import { Request, Response, NextFunction } from 'express';
import { PropertyFilter } from '@maat/api-types';

import { PropertyModel } from '../models/property.model';

export const getProperties = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query as PropertyFilter;
        const filters: PropertyFilter = {
            type: query.type,
            bedrooms: query.bedrooms,
            bathrooms: query.bathrooms,
            radius: query.radius,
            centerPoint: (query.centerPoint?.latitude && query.centerPoint?.longitude) ? {
                latitude: Number(query.centerPoint.latitude),
                longitude: Number(query.centerPoint.longitude)
            } : undefined
        };
        const properties = await PropertyModel.findAll(filters);
        res.json(properties);
    } catch (error) {
        next(error);
    }
};

export const createProperty = async (req: Request, res: Response, next: NextFunction) => {
    const { title, lat, lng, description, price, type, area, bedrooms, bathrooms } = req.body;

    try {
        const newProperty = await PropertyModel.create({
            title,
            description,
            price,
            lat,
            lng,
            type,
            area,
            bedrooms,
            bathrooms
        });
        res.status(201).json(newProperty);
    } catch (error) {
        next(error);
    }
};

export const getPropertiesInPolygon = async (req: Request, res: Response, next: NextFunction) => {
    const { geometryId } = req.params;
    try {
        const filters = req.query as PropertyFilter;
        const result = await PropertyModel.findInPolygon(geometryId as string, filters);
        res.json(result);
    } catch (error) {
        next(error);
    }
};
