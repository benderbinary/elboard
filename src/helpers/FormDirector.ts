import { ref } from 'vue';
import VInput from "../components/VInputComponent.vue";
import FormBuilder from "./FormBuilder";
import { z } from "zod";

export function useFormDirector(builder: FormBuilder) {
    const makeLoginForm = () => {
        return builder
            .addField({
                component: VInput,
                name: "username",
                type: "text",
                label: "username",
                props: {
                    value: ref(""),
                },
                validation: z.string().min(10).max(40),
            })
            .addField({
                component: VInput,
                name: "password",
                type: "password",
                label: "password",
                props: {
                    value: ref("default password"),
                },
                validation: z.string().min(10),
            })
            .addField({
                component: VInput,
                name: "textInput2",
                type: "text",
                label: "username",
                props: {
                    value: ref(""),
                },
                validation: z.string().min(10).max(40),
            })
            .build();
    };

    return {
        makeLoginForm,
    };
}
