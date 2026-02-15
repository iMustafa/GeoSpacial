import { useQuery as useRQQuery, type UseQueryOptions } from '@tanstack/react-query';

export function useQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(
    options: UseQueryOptions<TQueryFnData, TError, TData>
) {
    return useRQQuery(options);
}
