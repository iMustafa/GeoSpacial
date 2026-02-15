import { z } from 'zod';

export const createPropertySchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required'),
        lat: z.number({ error: 'Latitude (lat) is required' }),
        lng: z.number({ error: 'Longitude (lng) is required' }),
        description: z.string().optional(),
        price: z.number().optional()
    })
});

export const getPropertiesInPolygonSchema = z.object({
    params: z.object({
        geometryId: z.string().regex(/^\d+$/, 'Geometry ID must be a number')
    })
});
