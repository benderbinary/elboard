<template>
  <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
    <CardViewVue headerTitle="Total Revenue" cardClass="h-full">
      <template #card-header-icon>
        <DollarSign class="h-4 w-4 text-muted-foreground" />
      </template>
      <div class="text-2xl font-bold">$45,231.89</div>
      <p class="text-xs text-muted-foreground">+20.1% from last month</p>
    </CardViewVue>

    <CardViewVue headerTitle="Subscriptions" cardClass="h-full">
      <template #card-header-icon>
        <Users class="h-4 w-4 text-muted-foreground" />
      </template>
      <div class="text-2xl font-bold">+2350</div>
      <p class="text-xs text-muted-foreground">+180.1% from last month</p>
    </CardViewVue>
  </div>
</template>

<script setup lang="ts">
import { DollarSign, Users } from 'lucide-vue-next'
import CardViewVue from './CardView.vue'
</script>

<script lang="ts">
export default {}
</script>
