import { z } from 'zod';

export const createPropertySchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required'),
        description: z.string().optional(),
        price: z.number().optional(),
        x: z.number({ error: 'Longitude (x) is required' }),
        y: z.number({ error: 'Latitude (y) is required' })
    })
});

export const getPropertiesInPolygonSchema = z.object({
    params: z.object({
        geometryId: z.string().regex(/^\d+$/, 'Geometry ID must be a number')
    }),
    query: z.object({
        type: z.string().optional(),
        bedrooms: z.coerce.number().optional(),
        bathrooms: z.coerce.number().optional()
    })
});

export const getPropertiesSchema = z.object({
    query: z.object({
        type: z.string().optional(),
        bedrooms: z.coerce.number().optional(),
        bathrooms: z.coerce.number().optional(),
        latitude: z.coerce.number().optional(),
        longitude: z.coerce.number().optional(),
        radius: z.coerce.number().optional().default(10000) // Default 10km
    })
});
