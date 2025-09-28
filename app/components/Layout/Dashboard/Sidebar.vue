<template>
	<div
		class="h-full flex flex-col py-6 p-1 md:px-2 bg-white overflow-auto dark:!bg-gray-800 shadow-xl md:rounded-lg"
	>
		<div>
			<NuxtImg src="/logo/horizontal.png" class="h-16 hidden md:block" />
		</div>

		<!-- dashboard links -->
		<ul class="list-none flex flex-col gap-2 flex-1 text-black dark:!text-gray-400">
			<li v-for="(link, n) in links" :key="n">
				<NuxtLink
					:to="link.to"
					class="flex items-center gap-4 p-2 max-lg:justify-center rounded hover:bg-primary/10"
					active-class="after:w-2 after:h-2 after:bg-indigo-400 after:rotate-45 after:hidden md:after:block text-indigo-500  !bg-primary/20 shadow"
				>
					<Icon :name="link.icon" class="text-2xl" />

					<span class="flex-1 hidden md:block">
						{{ $t(link.title) }}
					</span>
				</NuxtLink>
			</li>

			<v-spacer />

			<button
				@click="dark = !dark"
				class="flex items-center justify-center p-2 hover:bg-primary/10 relative overflow-hidden rounded-lg"
			>
				<transition name="dark" mode="out-in">
					<Icon
						v-if="dark"
						class="text-lg md:text-2xl"
						name="line-md:sunny-filled-loop-to-moon-filled-loop-transition"
					></Icon>
					<Icon
						v-else
						name="line-md:moon-filled-alt-to-sunny-filled-loop-transition"
						class="text-lg md:text-2xl"
					></Icon>
				</transition>
			</button>

			<li
				class="cursor-pointer bg-red-100 dark:bg-red-100/5 hover:bg-red-200 flex md:px-4 gap-2 p-2 items-center text-red-700 rounded-md shadow dark:shadow-none md:justify-start justify-center"
				@click="logout"
			>
				<Icon name="material-symbols:power-settings-new-outline" class="text-2xl" />
				<span class="hidden md:block">{{ $t("auth.logout") }}</span>
			</li>
			<h3 class="bold opacity-60 text-sm text-center hidden md:block">{{ user.email }}</h3>
		</ul>
	</div>
</template>

<script setup lang="ts">
const user = useCookie("user", { decode: (u) => JSON.parse(atob(u)) });
const token = useCookie("token");
const dark = useCookie("dark", { default: () => false });

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
		icon: "bi:bus-front",
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

<style>
.dark-enter-active,
.dark-leave-active {
	transition: 0.5s ease !important;
}

.dark-enter-from,
.dark-leave-to {
	transform: translateY(200%);
}
</style>
