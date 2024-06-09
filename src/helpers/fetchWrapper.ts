import { useAuthStore } from '@/stores/authStore';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
    credentials?: RequestCredentials;
}

function request(method: RequestMethod) {
    return (url: string, body?: any, options: RequestOptions = {}) => {
        const requestOptions: RequestInit = {
            method,
            headers: defineAuthHeader(url)
        };

        if (body) {
            requestOptions.headers = {
                ...requestOptions.headers,
                'Content-Type': 'application/json'
            };
            requestOptions.body = JSON.stringify(body);
        }

        if (options.credentials) {
            requestOptions.credentials = options.credentials;
        }

        return fetch(url, requestOptions).then(handleResponse);
    };
}

function defineAuthHeader(url: string): HeadersInit {
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.jwtToken;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);

    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
        return {};
    }
}

function handleResponse(response: Response): Promise<any> {
    return response.text().then(text => {
        const data = text ? JSON.parse(text) : null;

        if (!response.ok) {
            const { user, logout } = useAuthStore();
            if ([401, 402, 403, 500].includes(response.status) && user) {
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
