import { Router } from 'express';
import propertyRoutes from './property.routes';
import locationGeometryRoutes from './locationGeometry.routes';

const router = Router();

router.use('/properties', propertyRoutes);
router.use('/location-geometries', locationGeometryRoutes);

export default router;
