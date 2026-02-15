import { useQuery } from '@maat/api-hooks';
import { locationGeometryApi } from '@maat/api-base';
import { locationGeometryQueryKeys } from './useLocationGeometryQueryKeys';

export const useLocationGeometryQuery = () => {
    return useQuery({
        queryKey: locationGeometryQueryKeys.list(),
        queryFn: () => locationGeometryApi.getLocationGeometries(),
    });
};
