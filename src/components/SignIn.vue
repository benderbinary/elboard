<template>
    <div class="relative flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="absolute inset-0 bg-gradient-to-br from-pink-200 via-indigo-400 to-slate-700 opacity-90"></div>
        <div
            class="absolute inset-0 text-slate-900/[0.17] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] transform -rotate-45">
            <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-bg" width="32" height="32" patternUnits="userSpaceOnUse" x="100%"
                        patternTransform="translate(0 -1)">
                        <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-bg)"></rect>
            </svg>
        </div>
        <div class="relative z-10 w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
            <div>
                <h2 class="company-title">Your Company</h2>
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account
                </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="username" class="sr-only">Username</label>
                        <input v-model="username" id="username" name="username" type="text" autocomplete="username"
                            required
                            class="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Username">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input v-model="password" id="password" name="password" type="password"
                            autocomplete="current-password" required
                            class="relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password">
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-300 hover:text-indigo-200">Forgot your password?</a>
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                        Sign in
                    </button>
                </div>
            </form>
            <p class="mt-2 text-center text-sm text-gray-600">
                Don't have an account?
                <a href="#" class="font-medium text-indigo-300 hover:text-indigo-200">Get access</a>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

export default defineComponent({
    name: 'SignIn',
    setup() {
        const username = ref('');
        const password = ref('');
        const authStore = useAuthStore();
        const router = useRouter();

        const handleSubmit = async () => {
            try {
                await authStore.login(username.value, password.value);
                router.push('/dashboard');
            } catch (error) {
                console.error('Login failed:', error);
            }
        };

        return {
            username,
            password,
            handleSubmit,
        };
    },
});
</script>

<style scoped>
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.company-title {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    color: #4F46E5;
    /* Indigo 600 color */
}
</style>