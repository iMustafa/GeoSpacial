import { Router } from 'express';
import * as LocationGeometryController from '../controllers/locationGeometry.controller';

const router = Router();

router.get(
    '/',
    LocationGeometryController.getLocationGeometries
);

export default router;
