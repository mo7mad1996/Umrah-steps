<template>
  <div>
    <LazyLayoutDashboardContent v-bind="hotels">
      <template #header>
        <LayoutDashboardPageTitle
          :title="$t('dashboard.hotels')"
          :buttons="[
            {
              text: $t('dashboard.hotel.add'),
              to: '/hotels/add',
              icon: 'material-symbols:add',
            },
          ]"
        />
      </template>

      <template v-slot="p"> </template>
    </LazyLayoutDashboardContent>
  </div>
</template>

<script setup lang="ts">
usePageTitle("dashboard.hotels");
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const page = ref(1);
const hotels = useHotels(12, page.value);
</script>
