<template>
  <div>
    <BaseInput type="search" placeholder="Search..." class="md:w-[100px] lg:w-[300px]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Input as BaseInput } from '@/components/ui/input'

export default defineComponent({
  name: 'SearchForm',
  components: { BaseInput }
})
</script>
