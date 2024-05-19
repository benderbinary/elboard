import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers/fetch-wrapper';
import type { UsersStateInterface } from '@/models/UsersStateInterface';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore({
    id: 'users',
    state: (): UsersStateInterface => ({
        users: {}
    }),
    actions: {
        async getAll() {
            this.users = { loading: true };
            try {
                const users = await fetchWrapper.get(baseUrl);
                this.users = users;
            } catch (error) {
                this.users = { error };
            }
        }
    }
});
