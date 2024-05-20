<template>
  <div v-if="isLoggedIn" class="grid-container">
    <HeaderView class="header" />
    <SidebarView class="sidebar" />
    <router-view class="main" />
    <FooterView class="footer" />
  </div>
  <div v-else>
    <SignIn />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuthStore } from './stores/authStore';
import HeaderView from './views/HeaderView.vue';
import SidebarView from './views/SidebarView.vue';
import FooterView from './views/FooterView.vue';
import SignIn from './components/SignIn.vue';

export default defineComponent({
  components: {
    HeaderView,
    SidebarView,
    FooterView,
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
    "aside header"
    "aside main"
    "aside footer";
  height: 100vh;
}

.header {
  grid-area: header;
  background-color: whitesmoke;
}

.main {
  grid-area: main;
  background-color: white;
}

.footer {
  grid-area: footer;
  background-color: whitesmoke;
}
</style>
