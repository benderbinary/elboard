import { reactive, computed } from 'vue';

export function useForm(fields: any[]) {
    const values = reactive(fields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {} as Record<string, string | boolean>));

    const errors = reactive({} as Record<string, string>);
    const submitable = computed(() => {
        return Object.values(errors).every(error => !error);
    });

    function onChangeHandler(value: string | boolean, name: string) {
        console.log(`value ${value} and name ${name} in onChangeHandler`);
        values[name] = value;
    }

    function submit() {
        console.log('Form submitted:', values);
    }

    return {
        values,
        errors,
        submitable,
        onChangeHandler,
        submit
    };
}
