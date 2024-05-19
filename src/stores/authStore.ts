import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import router from '@/router/index';

const baseUrl = import.meta.env.VITE_BORED_API_BASE_URL;

interface User {
    jwtToken: string;
    [key: string]: any;
}

interface AuthState {
    user: User | null;
    refreshTokenTimeout: ReturnType<typeof setTimeout> | null;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        user: null,
        refreshTokenTimeout: null
    }),
    actions: {
        async login(username: string, password: string) {
            console.log('baseUrl ', baseUrl);
            this.user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password }, { credentials: 'include' });
            this.startRefreshTokenTimer();
        },
        logout() {
            fetchWrapper.post(`${baseUrl}/revoke-token`, {}, { credentials: 'include' });
            this.stopRefreshTokenTimer();
            this.user = null;
            router.push('/login');
        },
        async refreshToken() {
            this.user = await fetchWrapper.post(`${baseUrl}/refresh-token`, {}, { credentials: 'include' });
            this.startRefreshTokenTimer();
        },
        startRefreshTokenTimer() {
            if (!this.user) return;

            const jwtBase64 = this.user.jwtToken.split('.')[1];
            const jwtToken = JSON.parse(atob(jwtBase64));
            const expires = new Date(jwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000); // Refresh minute before it expires 

            this.refreshTokenTimeout = setTimeout(() => {
                this.refreshToken();
            }, timeout);
        },
        stopRefreshTokenTimer() {
            if (this.refreshTokenTimeout) {
                clearTimeout(this.refreshTokenTimeout);
            }
        }
    }
});
