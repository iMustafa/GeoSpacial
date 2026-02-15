import { useQueryClient, useMutation } from '@maat/api-hooks';
import { propertiesApi } from '@maat/api-base';
import { propertyQueryKeys } from './usePropertiesQueryKeys';

export const useCreatePropertyMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: propertiesApi.createProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: propertyQueryKeys.list() });
        }
    });
};
