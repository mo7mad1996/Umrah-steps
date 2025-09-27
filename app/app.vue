<template>
	<Html
		:dir="localeProperties?.dir"
		:lang="localeProperties?.code"
		:class="`${localeProperties?.dir} ${dark && 'dark'}`"
	>
		<NuxtRouteAnnouncer />
		<pre>{{ localeProperties }}</pre>
		<LayoutPageBorders>
			<v-locale-provider :rtl="locale == 'ar'">
				<v-app :theme="dark ? 'dark' : 'light'">
					<v-main class="flex flex-col min-h-screen bg-neutral-100 dark:bg-zinc-700 font-cairo">
						<NuxtLayout>
							<NuxtPage />
						</NuxtLayout>
					</v-main>
				</v-app>
			</v-locale-provider>
		</LayoutPageBorders>
	</Html>
</template>

<script setup lang="ts">
const { localeProperties, locale, t } = useI18n();
const { message } = useRouteAnnouncer();
const dark = useCookie("dark");

watch(
	[locale, message],
	() => {
		useHead({
			titleTemplate: (title) => [title, t("site_name")].filter((i) => i).join(" ⁘ "),
		});
	},
	{ immediate: true },
);
</script>

<style>
html.dark {
	background-color: #24252b;
}

.page-enter-active,
.page-leave-active {
	transition: all 0.3s;
}

.page-enter-from {
	opacity: 0.4;
	transform: perspective(1000px) translateZ(50px);
}

.page-leave-to {
	opacity: 0;
	transform: perspective(1000px) translateZ(-50px);
}
</style>
