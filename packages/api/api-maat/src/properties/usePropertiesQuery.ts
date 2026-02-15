import { useQuery } from '@maat/api-hooks';
import { propertiesApi } from '@maat/api-base';
import { propertyQueryKeys } from './usePropertiesQueryKeys';
import { PropertyFilter } from '@maat/api-types';

export const usePropertiesQuery = (filters?: PropertyFilter) => {
    return useQuery({
        queryKey: propertyQueryKeys.list(filters),
        queryFn: () => propertiesApi.getProperties(filters),
    });
};