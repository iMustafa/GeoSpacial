import axios from 'axios';

// Default base URL, can be overridden via environment variables
const API_URL = 'http://localhost:3000';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptors if needed (e.g. for auth)
apiClient.interceptors.response.use(
    (response) => response.data, // Unwrap data automatically
    (error) => Promise.reject(error)
);
