import { type ObjectGeneric } from './ObjectGenericInterface'
export interface Field {
    component: any;
    type: string;
    label?: string;
    name: string;
    props?: ObjectGeneric;
    attrs?: ObjectGeneric;
    validation?: any;
}
