type ApiQueryKeys = 'properties' | 'locationGeometry';

export function useCreateQueryKeys<T extends ApiQueryKeys, K extends Record<string, (...args: any[]) => readonly any[]>>(key: T, methods: K): { [P in keyof K]: (...args: Parameters<K[P]>) => readonly [T, ...ReturnType<K[P]>] } {
    const keys = {} as any;

    for (const method in methods) {
        keys[method] = (...args: any[]) => [key, ...methods[method](...args)] as const;
    }

    return keys;
}
