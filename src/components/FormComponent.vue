<template>
  <div
    class="relative flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <form @submit.prevent="submit" class="mt-8 space-y-6">
      <div
        v-for="(field, index) in formFields"
        :key="field.name"
        class="rounded-md shadow-sm -space-y-px"
      >
        <div>
          <label :for="field.name" class="sr-only">{{ field.label }}</label>
          <component
            :id="field.name + index.toString()"
            :is="field.component"
            :type="field.type"
            v-bind="field.attrs"
            v-model="values[field.name]"
            class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div class="error" v-if="errors[field.name]">
          {{ errors[field.name] }}
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-300 hover:text-indigo-200"
            >Forgot your password?</a
          >
        </div>
      </div>
      <div>
        <button
          type="submit"
          :disabled="!submitable"
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 shadow-md focus:ring-slate-500 focus:ring-offset-2"
        >
          Sign in
        </button>
      </div>
      <br />
      <br />
      <pre>{{ fieldValues }}</pre>
    </form>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent, computed, markRaw, ref, type PropType } from 'vue'
import { useForm } from '../composables/useForm'
import type { Field } from '../helpers/FormBuilder'

export default defineComponent({
  props: {
    id: {
      type: [String, Number],
      default: null
    },
    fields: {
      type: Array as PropType<Field[]>,
      default: () => []
    }
  },
  setup(props) {
    const formFields = props.fields.map((field) => ({
      ...field,
      component: markRaw(field.component)
    }))

    const { values, errors, submitable, onChangeHandler, submit } = useForm(formFields)

    // reactive object with dynamic keys
    const fieldValues = computed(() => {
      const fieldValuesObj: { [key: string]: any } = {}
      formFields.forEach((field) => {
        fieldValuesObj[field.name] = values[field.name]
      })
      return fieldValuesObj
    })

    const handleModelUpdate = (name: string) => {
      return (value: string | boolean) => {
        onChangeHandler(value, name)
      }
    }

    return {
      errors,
      submitable,
      formFields,
      submit,
      handleModelUpdate,
      fieldValues,
      values // Ensure values is exposed
    }
  }
})
</script>
  
  <style scoped>
.label {
  display: block;
  margin-bottom: 0.5rem;
}

.error {
  color: red;
  margin-top: 0.5rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
  