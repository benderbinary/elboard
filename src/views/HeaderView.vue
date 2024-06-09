<template>
  <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    <AppNavigation />
    <SearchForm />
    <UserAccountDropdown />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppNavigation from './AppNavigation.vue'
import SearchForm from './SearchForm.vue'
import UserAccountDropdown from './UserAccountDropdown.vue'

export default defineComponent({
  name: 'HeaderView',
  components: {
    AppNavigation,
    SearchForm,
    UserAccountDropdown
  }
})
</script>
