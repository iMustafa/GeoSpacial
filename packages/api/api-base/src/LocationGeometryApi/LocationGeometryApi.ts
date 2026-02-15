import type { LocationGeometry } from '@maat/api-types';
import { apiClient } from '../ApiClient/ApiClient';

export const locationGeometryApi = {
    getLocationGeometries: async (): Promise<LocationGeometry[]> => {
        return apiClient.get('/api/location-geometries');
    }
};
