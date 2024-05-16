import { defineStore } from "pinia";
import { fetchActivity } from "@/services/activityService";
import type { ActivityInterface } from "@/models/ActivityInterface";

export const activityStore = defineStore("activity", {
    state: () => ({
        activity: null as ActivityInterface | null,
    }),
    actions: {
        async fetchActivityAction() {
            const result = await fetchActivity();
            if (result) {
                this.activity = result;
            }
        },
    },
});
