<template>
    <component :is="loginFormComponent" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FormBuilder from "../helpers/FormBuilder";
import { useFormDirector } from "../helpers/FormDirector";

export default defineComponent({
    setup() {
        const builder = new FormBuilder();
        const { makeLoginForm } = useFormDirector(builder);
        const loginFormComponent = ref(makeLoginForm());

        return {
            loginFormComponent
        };
    }
});
</script>