<template>
  <div v-if="isLoggedIn" class="grid-container">
    <SidebarView class="sidebar" />
    <router-view class="main" />
  </div>
  <div v-else>
    <SignIn />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuthStore } from './stores/authStore';
import SidebarView from './views/SidebarView.vue';
import SignIn from './components/SignIn.vue';

export default defineComponent({
  components: {
    SidebarView,
    SignIn,
  },
  setup() {
    const authStore = useAuthStore();
    const isLoggedIn = computed(() => !!authStore.user);
    return { isLoggedIn };
  },
});
</script>

<style lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas:
    "aside main";
  height: 100vh;
}

.main {
  grid-area: main;
  background-color: white;
}
</style>
