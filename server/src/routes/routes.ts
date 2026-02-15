import { Router } from 'express';
import propertyRoutes from './property.routes';

const router = Router();

router.use('/properties', propertyRoutes);

export default router;
