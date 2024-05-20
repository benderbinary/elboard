<template>
    <div class="relative flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="absolute inset-0 bg-gradient-to-br from-orange-700 via-white to-indigo-700 opacity-60"></div>
        <div
            class="absolute inset-0 text-slate-900/[0.09] [mask-image:linear-gradient(to_bottom_left,transparent,transparent,white)]">
            <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-bg" width="32" height="32" patternUnits="userSpaceOnUse"
                        patternTransform="rotate(-45)">
                        <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-bg)"></rect>
            </svg>
        </div>
        <div class="relative z-10 w-full max-w-md space-y-8 p-8 rounded-lg">
            <transition name="slide-fade" mode="out-in">
                <div v-if="loginError" key="alert"
                    class="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-md alert" role="alert"
                    @click="closeAlert">
                    <div id="alert-2"
                        class="flex items-center p-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert">
                        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span class="sr-only">Info</span>
                        <div class="ms-3 text-sm font-medium">
                            A simple info alert with an <a href="#"
                                class="font-semibold underline hover:no-underline">example
                                link</a>. Give it a click if you like.
                        </div>
                        <button type="button"
                            class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                            data-dismiss-target="#alert-2" aria-label="Close">
                            <span class="sr-only">Close</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </transition>
            <div>
                <h2 class="company-title">Logo</h2>
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
                        class="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 shadow-md focus:ring-slate-500 focus:ring-offset-2">
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
        const loginError = ref(false);

        const handleSubmit = async () => {
            try {
                await authStore.login(username.value, password.value);
                router.push('/dashboard');
                loginError.value = false;
            } catch (error) {
                console.error('Login failed:', error);
                loginError.value = true;
            }
        };

        const closeAlert = () => {
            loginError.value = false;
        };

        return {
            username,
            password,
            handleSubmit,
            loginError,
            closeAlert,
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

.close-btn {
    cursor: pointer;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

.alert {
    z-index: 20;
}
</style>
