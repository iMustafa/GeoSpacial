import { useCreateQueryKeys } from '@maat/api-hooks';

export const propertyQueryKeys = useCreateQueryKeys('properties', {
    list: (filters?: any) => ['list', filters] as const,
    polygon: (geometryId: number | string, filters?: any) => ['polygon', geometryId, filters] as const,
});
