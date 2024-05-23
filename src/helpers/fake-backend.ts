export { fakeBackend };

const usersKey = 'vue-3-jwt-refresh-token-users';
const users: Array<User> = JSON.parse(localStorage.getItem(usersKey) || '[]');

if (!users.length) {
    users.push({ id: 1, firstName: 'Test', lastName: 'User', username: 'test', password: 'test', refreshTokens: [] });
    localStorage.setItem(usersKey, JSON.stringify(users));
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    refreshTokens: string[];
}

function fakeBackend() {
    const realFetch = window.fetch;
    window.fetch = function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
        return new Promise((resolve, reject) => {
            setTimeout(handleRoute, 3500); // Loading timeout

            function handleRoute() {
                const { method } = init || {};
                const url = typeof input === 'string' ? input : input.toString();
                switch (true) {
                    case url.endsWith('/users/authenticate') && method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/refresh-token') && method === 'POST':
                        return refreshToken();
                    case url.endsWith('/users/revoke-token') && method === 'POST':
                        return revokeToken();
                    case url.endsWith('/users') && method === 'GET':
                        return getUsers();
                    case method === 'OPTIONS':
                        return preflight();
                    default:
                        return realFetch(input, init)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            function authenticate() {
                const { username, password } = body() as { username: string; password: string };
                const user = users.find(x => x.username === username && x.password === password);

                if (!user) {
                    return error('Username or password is incorrect');
                }
                user.refreshTokens.push(generateRefreshToken());

                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    jwtToken: generateJwtToken()
                });
            }

            function refreshToken() {
                const refreshToken = getRefreshToken();

                if (!refreshToken) return unauthorized();

                const user = users.find(x => x.refreshTokens.includes(refreshToken));

                if (!user) return unauthorized();
                user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
                user.refreshTokens.push(generateRefreshToken());
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    jwtToken: generateJwtToken()
                });
            }

            function revokeToken() {
                if (!isLoggedIn()) return unauthorized();

                const refreshToken = getRefreshToken();
                const user = users.find(x => x.refreshTokens.includes(refreshToken));
                if (user) {
                    user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
                    localStorage.setItem(usersKey, JSON.stringify(users));
                }

                return ok({});
            }

            function getUsers() {
                if (!isLoggedIn()) return unauthorized();
                return ok(users);
            }

            // helper functions

            function ok(body: any) {
                resolve(new Response(JSON.stringify(body), {
                    status: 200,
                    headers: corsHeaders()
                }));
            }

            function unauthorized() {
                resolve(new Response(JSON.stringify({ message: 'Unauthorized' }), {
                    status: 401,
                    headers: corsHeaders()
                }));
            }

            function error(message: string) {
                resolve(new Response(JSON.stringify({ message }), {
                    status: 400,
                    headers: corsHeaders()
                }));
            }

            function preflight() {
                resolve(new Response(null, {
                    status: 204,
                    headers: corsHeaders()
                }));
            }

            function corsHeaders() {
                return {
                    'Access-Control-Allow-Origin': 'http://localhost:4000',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                };
            }

            function isLoggedIn() {
                // check if jwt token is in auth header
                const authHeader = (init?.headers instanceof Headers)
                    ? init.headers.get('Authorization')
                    : (init?.headers as Record<string, string | undefined>)?.['Authorization'] || '';
                if (!authHeader?.startsWith('Bearer fake-jwt-token')) return false;

                // check if token is expired
                try {
                    const jwtToken = JSON.parse(atob(authHeader.split('.')[1]));
                    const tokenExpired = Date.now() > (jwtToken.exp * 1000);
                    return !tokenExpired;
                } catch {
                    return false;
                }
            }

            function body() {
                return init?.body ? JSON.parse(init.body as string) : {};
            }

            function generateJwtToken() {
                // create token that expires in 15 minutes
                const tokenPayload = { exp: Math.round(new Date(Date.now() + 15 * 60 * 1000).getTime() / 1000) };
                return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;
            }

            function generateRefreshToken() {
                const token = new Date().getTime().toString();

                // add token cookie that expires in 7 days
                const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
                document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;

                return token;
            }

            function getRefreshToken() {
                // get refresh token from cookie
                return (document.cookie.split(';').find(x => x.includes('fakeRefreshToken')) || '=').split('=')[1];
            }
        });
    }
}
