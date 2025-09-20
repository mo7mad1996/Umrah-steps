<template>
  <div class="h-full">
    <div class="grid grid-cols-12 gap-4 min-h-dvh">
      <!-- Sidebar (Large Screens) -->
      <div class="lg:col-span-3 xl:col-span-2 h-dvh sticky top-0">
        <LayoutDashboardSidebar />
      </div>

      <!-- Main Content -->
      <section class="p-2 md:p-6 col-span-12 lg:col-span-9 xl:col-span-10">
        <slot />
      </section>
    </div>
  </div>
</template>
