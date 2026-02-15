import type { Property, CreatePropertyPayload, PropertyFilter } from '@maat/api-types';
import { apiClient } from '../ApiClient/ApiClient';

export const propertiesApi = {
    getProperties: async (filters?: PropertyFilter): Promise<Property[]> => {
        return apiClient.get('/api/properties', { params: filters });
    },
    getPropertiesInPolygon: async (geometryId: number | string, filters?: PropertyFilter): Promise<Property[]> => {
        return apiClient.get(`/api/properties/in-polygon/${geometryId}`, { params: filters });
    },
    createProperty: async (data: CreatePropertyPayload): Promise<Property> => {
        return apiClient.post('/api/properties', data);
    }
};
