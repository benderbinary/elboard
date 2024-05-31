<template>
  <div
    class="sidebar relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-screen w-full p-4 shadow-xl shadow-blue-gray-900/5">
    <div
      class="absolute inset-0 text-slate-900/[0.02] [mask-image:linear-gradient(to_bottom_left,transparent,transparent,white)] pointer-events-none">
      <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-bg" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-bg)"></rect>
      </svg>
    </div>
    <div class="mb-2 p-4 relative z-10">
      <div class="flex items-center mb-6">
        <img src="/src/assets/logo.svg" alt="Logo" class="h-10 mr-3">
        <span class="text-2xl font-semibold">ElBoard</span>
      </div>
    </div>
    <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 relative z-10">
      <router-link to="/"
        class="flex items-center p-3 rounded-lg text-start transition-all hover:bg-blue-50 hover:text-blue-900"
        active-class="active">
        Home
      </router-link>
      <router-link to="/about"
        class="flex items-center p-3 rounded-lg text-start transition-all hover:bg-blue-50 hover:text-blue-900"
        active-class="active">
        About
      </router-link>
      <router-link to="/table"
        class="flex items-center p-3 rounded-lg text-start transition-all hover:bg-blue-50 hover:text-blue-900"
        active-class="active">
        Table
      </router-link>
      <div to="" class="flex items-center p-3 rounded-lg text-start transition-all">
        Patterns
      </div>
    </nav>
    <ul class="flex flex-col py-4 relative z-10">
      <li>
        <router-link to="/patterns/builder"
          class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          active-class="active">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
            <i class="bx bx-home"></i>
          </span>
          <span class="text-sm font-medium">Builder Pattern</span>
        </router-link>
      </li>
      <li>
        <div @click="handleLogout"
          class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
            <i class="bx bx-log-out"></i>
          </span>
          <span class="text-sm font-medium">Logout</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '../stores/authStore'

export default defineComponent({
  name: 'SidebarView',
  setup() {
    const authStore = useAuthStore();

    const handleLogout = () => {
      authStore.logout()
    }

    return {
      handleLogout
    }
  }
})
</script>

<style scoped>
.active {
  background-color: #e0f2ff;
  color: #1d4ed8;
}
</style>
