import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export class ApiClient extends QueryClient {
    constructor(config?: any) {
        super(config);
    }
}

export const ReactQueryProvider = QueryClientProvider;
