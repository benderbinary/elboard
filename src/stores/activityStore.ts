import { defineStore } from "pinia";
import { fetchActivity } from "@/services/activityService";
import type { ActivityInterface } from "@/models/ActivityInterface";

export const activityStore = defineStore("activity", {
    state: () => ({
        activity: null as ActivityInterface | null,
    }),
    actions: {
        async fetchActivityAction(): Promise<void> {
            const result = await fetchActivity();
            console.log('result in fetchActivityAction ', result);
            result ? this.activity = result : this.activity = null;
        },
    },
});
