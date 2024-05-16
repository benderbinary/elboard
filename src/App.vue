<template>
  <div class="grid-container">
    <HeaderView />
    <SidebarView />
    <MainContentView />
    <FooterView />
  </div>
</template>

<script>
import HeaderView from './views/HeaderView.vue';
import SidebarView from './views/SidebarView.vue';
import MainContentView from './views/MainContentView.vue';
import FooterView from './views/FooterView.vue';

export default {
  components: {
    HeaderView,
    SidebarView,
    MainContentView,
    FooterView
  }
}
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

.sidebar {
  grid-area: aside;
  position: static;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}
</style>
