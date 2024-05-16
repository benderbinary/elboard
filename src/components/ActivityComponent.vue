<template>
  <div class="flex">
    <div class="w-full p-4">
      <h1>Activity Finder</h1>
      <button @click="fetchActivity">Get a New Activity</button>
      <div v-if="activity">
        <p>{{ activity.activity }}</p>
        <p>Type: {{ activity.type }}</p>
        <p>Participants: {{ activity.participants }}</p>
        <p>Price: {{ activity.price }}</p>
      </div>
    </div>
    <!-- vue-cal integration -->
    <vue-cal :events="calendarEvents"></vue-cal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { activityStore } from '../stores/activityStore'
import { ActivityInterface } from '../models/ActivityInterface';
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
