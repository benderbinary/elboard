<template>
    <input :name="props.name" :type="props.type" :value="inputValue" :checked="Boolean(inputValue)"
        @input="onChangeHandler" />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useInput } from '../composables/useInput';

const props = defineProps({
    type: {
        default: null,
        type: String,
    },
    modelValue: {
        default: null,
        type: [String, Boolean],
    },
    name: {
        default: null,
        type: String,
    },
});

const emit = defineEmits(['update:modelValue']);

const { inputValue, onChangeHandler } = useInput(props, emit);
</script>

<style scoped></style>