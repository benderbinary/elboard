<template>
  <Card :class="cardClass">
    <CardHeader v-if="headerTitle">
      <slot name="card-header">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            {{ headerTitle }}
          </CardTitle>
          <slot name="card-header-icon"></slot>
        </div>
      </slot>
    </CardHeader>
    <CardContent>
      <slot></slot>
    </CardContent>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default defineComponent({
  name: 'CardView',
  props: {
    headerTitle: String,
    cardClass: String
  },
  components: {
    Card,
    CardContent,
    CardHeader,
    CardTitle
  }
})
</script>
