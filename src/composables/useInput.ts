import { ref, watch } from 'vue'

export function useInput(
    props: {
        type?: string | null
        modelValue?: string | boolean | null
        name?: string | null
    },
    emit: (event: 'update:modelValue', value: string | boolean) => void
) {
    const inputValue = ref(props.modelValue)

    watch(
        () => props.modelValue,
        newValue => {
            inputValue.value = newValue
        }
    )

    function onChangeHandler(event: Event) {
        const target = event.target as HTMLInputElement
        const value = props.type === 'checkbox' ? target.checked : target.value
        emit('update:modelValue', value)
    }

    return {
        inputValue,
        onChangeHandler
    }
}
