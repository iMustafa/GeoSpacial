import { useMutation as useRQMutation, type UseMutationOptions } from '@tanstack/react-query';

export function useMutation<TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown>(
    options: UseMutationOptions<TData, TError, TVariables, TContext>
) {
    return useRQMutation(options);
}
