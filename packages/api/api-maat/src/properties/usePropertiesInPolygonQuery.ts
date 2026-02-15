import { useQuery } from "@maat/api-hooks";
import { propertiesApi } from '@maat/api-base';
import { propertyQueryKeys } from "./usePropertiesQueryKeys";
import { PropertyFilter } from '@maat/api-types';

export const usePropertiesInPolygonQuery = (geometryId: number | string, filters?: PropertyFilter) => {
    return useQuery({
        queryKey: propertyQueryKeys.polygon(geometryId, filters),
        queryFn: () => propertiesApi.getPropertiesInPolygon(geometryId, filters),
        enabled: Boolean(geometryId),
    });
};