<template>
  <div class="h-full flex flex-col bg-gray-300 dark:bg-slate-800 py-6">
    <div>
      <NuxtImg src="/logo/horizontal.png" class="h-16" />
    </div>

    <!-- dashboard links -->
    <ul class="list-none flex flex-col gap-2 flex-1 p-2">
      <li v-for="(link, n) in links" :key="n">
        <NuxtLink
          :to="link.to"
          class="flex items-center gap-x-2 p-2 max-lg:justify-center rounded hover:bg-primary/20"
          active-class="bg-primary dark:bg-primary-dark text-indigo-500 rounded shadow shadow"
        >
          <Icon :name="link.icon" />

          <span>
            {{ $t(link.title) }}
          </span>
        </NuxtLink>
      </li>

      <v-spacer />
      <li
        class="cursor-pointer hover:bg-red-700/90 hover:text-white flex px-2 gap-2 items-center text-red-700 py-1 hover:shadow max-md:justify-center"
      >
        <Icon name="material-symbols:power-settings-new-outline" />
        <div class="flex items-center gap-x-2 p-2" @click="logout">
          <span>{{ $t("auth.logout") }}</span>
        </div>
      </li>
      <h3 class="bold opacity-60 text-center">{{ user.email }}</h3>
    </ul>
  </div>
</template>

<script setup lang="ts">
const user = useCookie("user", { decode: (u) => JSON.parse(atob(u)) });
const token = useCookie("token");

const links = [
  {
    icon: "ic:sharp-space-dashboard",
    title: "dashboard.home",
    to: "/dashboard",
  },

  {
    icon: "ri:hotel-bed-fill",
    title: "dashboard.hotels",
    to: "/dashboard/hotels",
  },
  {
    icon: "ri:hotel-bed-fill",
    title: "dashboard.transports",
    to: "/dashboard/transports",
  },
  {
    icon: "ic:baseline-settings",
    title: "dashboard.site_settings",
    to: "/dashboard/settings/site",
  },
  {
    icon: "ic:baseline-admin-panel-settings",
    title: "dashboard.profile_settings",
    to: "/dashboard/settings/profile",
  },
  {
    icon: "material-symbols:rocket-launch",
    title: "dashboard.site",
    to: "/",
  },
];

// logout methods
const logout = () => {
  token.value = undefined;
  user.value = undefined;
  navigateTo("/login");
};
</script>

<style scoped>
.active,
.sidebar .router-link-active.router-link-active {
  @apply rounded-e-lg  text-indigo-500 lg:bg-violet-100;
}
</style>
