<template>
  <nav
    class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
  >
    <a href="#" class="flex items-center gap-2 text-lg font-semibold md:text-base">
      <Package2 class="h-6 w-6" />
      <span class="sr-only">Acme Inc</span>
    </a>
    <router-link to="/">Dashboard</router-link>
    <router-link to="/orders">Orders</router-link>
    <router-link to="/products">Products</router-link>
    <router-link to="/customers">Customers</router-link>
    <router-link to="/analytics">Analytics</router-link>
  </nav>

  <Sheet>
    <SheetTrigger as-child>
      <BaseButton variant="outline" size="icon" class="shrink-0 md:hidden">
        <MenuIcon class="h-5 w-5" />
        <span class="sr-only">Toggle navigation menu</span>
      </BaseButton>
    </SheetTrigger>
    <SheetContent side="left"> </SheetContent>
  </Sheet>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Package2 } from 'lucide-vue-next'
import { Button as BaseButton } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import MenuIcon from './MenuIcon.vue' // TODO:

export default defineComponent({
  name: 'AppNavigation',
  components: {
    Package2,
    BaseButton, // Use the aliased name
    Sheet,
    SheetContent,
    SheetTrigger,
    MenuIcon
  }
})
</script>
