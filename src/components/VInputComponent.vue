<template>
  <input :type="type" :value="modelValue" @input="updateValue" class="input-class" />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'VInput',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    type: {
      type: String as PropType<'text' | 'password' | 'email'>,
      default: 'text'
    }
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue(event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('update:modelValue', target.value)
    }
  }
})
</script>

<style scoped></style>
