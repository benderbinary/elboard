<template>
  <div class="relative flex h-dvh items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="absolute inset-0 bg-gradient-to-br from-orange-700 via-white to-indigo-700 opacity-10"></div>
    <div
      class="absolute inset-0 text-slate-900/[0.19] [mask-image:linear-gradient(to_bottom_left,transparent,transparent,white)]">
      <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-bg" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-bg)"></rect>
      </svg>
    </div>
    <div class="relative z-10 flex w-full max-w-full p-8 rounded-lg bg-white shadow-md h-full">
      <div class="w-2/12 p-4 space-y-4">
        <h1 class="text-center text-3xl font-bold text-gray-900">Activity Finder</h1>
        <button @click="fetchActivity"
          class="mt-4 w-full rounded-md bg-slate-600 py-2 px-4 text-white font-medium hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
          Get a New Activity
        </button>
        <div v-if="activity" class="mt-4">
          <p class="text-lg"><strong>Activity:</strong> {{ activity.activity }}</p>
          <p class="text-lg"><strong>Type:</strong> {{ activity.type }}</p>
          <p class="text-lg"><strong>Participants:</strong> {{ activity.participants }}</p>
          <p class="text-lg"><strong>Price:</strong> {{ activity.price }}</p>
        </div>
      </div>
      <div class="w-10/12 p-4">
        <vue-cal :events="calendarEvents"></vue-cal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { activityStore } from '../stores/activityStore';
import { type ActivityInterface } from '../models/ActivityInterface';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default defineComponent({
  components: {
    VueCal
  },
  setup() {
    const store = activityStore();
    const activity = ref<ActivityInterface | null>(null);
    const calendarEvents = ref([
      {
        start: new Date(),
        end: new Date(),
        title: '',
        content: ''
      }
    ]);

    async function fetchActivity() {
      await store.fetchActivityAction();
    }

    watch(
      () => store.activity,
      (newActivity) => {
        activity.value = newActivity;
        if (newActivity) {
          calendarEvents.value = [{
            start: new Date(),
            end: new Date(),
            title: newActivity.activity,
            content: `Participants: ${newActivity.participants}, Price: ${newActivity.price}`
          }];
        }
      },
      { immediate: true }
    );

    return {
      activity,
      fetchActivity,
      calendarEvents
    };
  },
});
</script>

<style scoped>
.grid-bg {
  fill: none;
  stroke: currentColor;
}
</style>
