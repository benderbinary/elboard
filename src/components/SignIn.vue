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
        <div class="relative z-10 w-full max-w-md space-y-8 p-8 rounded-lg bg-white shadow-md">
            <transition name="slide-fade" mode="out-in">
                <div v-if="loginError" key="alert" class="alert" role="alert">
                    <strong class="font-bold">Holy smokes!</strong>
                    <span class="block sm:inline">Something seriously bad happened.</span>
                    <span class="close-btn" @click="closeAlert">
                        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20">
                            <title>Close</title>
                            <path
                                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </span>
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
}

.alert {
    background-color: #FEF3C7;
    /* Amber 100 */
    border: 1px solid #FBBF24;
    /* Amber 500 */
    color: #92400E;
    /* Amber 800 */
    padding: 1rem;
    border-radius: 0.375rem;
    position: relative;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
</style>