import { useCreateQueryKeys } from '@maat/api-hooks';

export const locationGeometryQueryKeys = useCreateQueryKeys('locationGeometry', {
    list: () => ['list'] as const,
});
