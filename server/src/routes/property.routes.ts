import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { createPropertySchema, getPropertiesInPolygonSchema, getPropertiesSchema } from '../validations/propertySchemas';
import * as PropertyController from '../controllers/property.controller';

const router = Router();

router.get(
    '/',
    validate(getPropertiesSchema),
    PropertyController.getProperties
);

router.post(
    '/',
    validate(createPropertySchema),
    PropertyController.createProperty
);

router.get(
    '/in-polygon/:geometryId',
    validate(getPropertiesInPolygonSchema),
    PropertyController.getPropertiesInPolygon
);

export default router;
