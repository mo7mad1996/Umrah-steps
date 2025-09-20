<template>
  <div
    class="absolute w-full bg-primary pointer-events-none h-12 blur-3xl top-0 z-40"
  ></div>
  <LayoutHeader />
  <div class="flex-1">
    <slot />
  </div>
  <LayoutFooter />
</template>
