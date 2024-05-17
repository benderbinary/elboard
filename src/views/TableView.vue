<template>
  <ActivityComponent />
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const ActivityComponent = defineAsyncComponent({
  loader: () => import('./../components/ActivityComponent.vue'),
  loadingComponent: LoadingSpinner
})

export default {
  components: { ActivityComponent }
}
</script>