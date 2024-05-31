import { defineComponent, h, type VNode } from "vue";
import FormComponent from "@/components/FormComponent.vue";

export interface ObjectGeneric {
    [keys: string]: any;
}

export interface Field {
    component: any;
    type: string;
    label?: string;
    name: string;
    props?: ObjectGeneric;
    attrs?: ObjectGeneric;
    validation?: any;
}

export default class FormBuilder {
    fields: Field[];
    provider: any;

    constructor() {
        this.fields = [];
    }

    addField(field: Field) {
        this.fields.push(field);
        return this;
    }

    build() {
        const Fields = this.fields;

        return defineComponent({
            props: {
                id: {
                    default: null,
                    type: String || Number,
                },
            },
            render(): VNode {
                return h(FormComponent, { fields: Fields, id: this.id });
            },
        });
    }
}