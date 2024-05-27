<template>
    <div class="relative flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <background-pattern></background-pattern>

        <transition name="fade" @after-enter="onTransitionEnd('alert')">
            <alert-component v-if="!isLoading && loginError" :show="loginError" @close="loginError = false">
                Login error!
                <a href="#" class="font-semibold underline hover:no-underline">slot link to knowhere</a>
            </alert-component>
        </transition>

        <transition name="fade" @after-enter="onTransitionEnd('loading')">
            <loading-animation v-if="isLoading"></loading-animation>
        </transition>

        <transition name="fade" @after-enter="onTransitionEnd('form')">
            <div v-if="!isLoading" class="relative z-10 w-full max-w-md space-y-8 p-8 rounded-lg">
                <div>
                    <h2 class="company-title">Logo</h2>
                    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="username" class="sr-only">Username</label>
                            <input v-model="username" id="username" name="username" type="text" autocomplete="username"
                                required
                                class="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Username" />
                        </div>
                        <div>
                            <label for="password" class="sr-only">Password</label>
                            <input v-model="password" id="password" name="password" type="password"
                                autocomplete="current-password" required
                                class="relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password" />
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="text-sm">
                            <a href="#" class="font-medium text-indigo-300 hover:text-indigo-200">Forgot your
                                password?</a>
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
                    Maidenless? Wanna buy bad jokes?
                    <a href="#" class="font-medium text-indigo-300 hover:text-indigo-200">Get access</a>
                </p>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import AlertComponent from './AlertComponent.vue';
import BackgroundPattern from './BackgroundPattern.vue';
import LoadingAnimation from './LoadingAnimation.vue';

export default defineComponent({
    components: {
        BackgroundPattern,
        AlertComponent,
        LoadingAnimation
    },
    name: 'SignIn',
    setup() {
        const username = ref('');
        const password = ref('');
        const authStore = useAuthStore();
        const router = useRouter();
        const loginError = ref(false);
        const isLoading = ref(false);
        const transitionQueue = ref<string[]>([]);

        const handleSubmit = async () => {
            isLoading.value = true;
            try {
                await authStore.login(username.value, password.value);
                router.push('/dashboard');
                loginError.value = false;
            } catch (error) {
                console.error('login error ', error);
                loginError.value = true;
            } finally {
                isLoading.value = false;
            }
        };

        const closeAlert = () => {
            loginError.value = false;
        };

        const onTransitionEnd = (transitionName: string) => {
            const index = transitionQueue.value.indexOf(transitionName);
            if (index > -1) {
                transitionQueue.value.splice(index, 1);
            }
            if (transitionQueue.value.length > 0) {
                transitionQueue.value.shift();
            }
        };

        const startTransition = (transitionName: string) => {
            transitionQueue.value.push(transitionName);
            if (transitionQueue.value.length === 1) {
                transitionQueue.value.shift();
            }
        };

        return {
            username,
            password,
            handleSubmit,
            loginError,
            closeAlert,
            isLoading,
            onTransitionEnd,
            startTransition
        };
    }
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
    color: #4f46e5;
}

.close-btn {
    cursor: pointer;
}

.fade-enter-active {
    transition: opacity 0.5s ease;
}

.fade-leave-active {
    transition: opacity 0s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.alert {
    z-index: 20;
}
</style>