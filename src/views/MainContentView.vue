<template>
  <main class="main bg-white p-4">
    <div>
      <vue-draggable-resizable>
        <HeaderView />
        <DashboardCards />
      </vue-draggable-resizable>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderView from './HeaderView.vue'
import DashboardCards from './DashboardCards.vue'

export default defineComponent({
  name: 'MainContentView',
  components: {
    HeaderView,
    DashboardCards
  }
})
</script>
