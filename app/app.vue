<template>
	<NuxtRouteAnnouncer />
	<v-locale-provider :rtl="locale == 'ar'">
		<v-theme-provider :theme="cookie_theme" with-background>
			<Html
				:dir="localeProperties?.dir"
				:lang="localeProperties?.code"
				:class="`${localeProperties?.dir} ${theme.name.value}`"
			>
				<LayoutPageBorders>
					<v-app>
						<v-main class="flex flex-col min-h-dvh bg-neutral-100 dark:bg-zinc-700 font-cairo">
							<NuxtLayout>
								<NuxtPage />
							</NuxtLayout>
						</v-main>
					</v-app>
				</LayoutPageBorders>
			</Html>
		</v-theme-provider>
	</v-locale-provider>
</template>

<script setup lang="ts">
const { localeProperties, locale, t } = useI18n();
const { message } = useRouteAnnouncer();

const theme = useTheme();

const cookie_theme = useCookie<string | undefined>("theme");
onMounted(() => {
	if (cookie_theme.value) theme.change(cookie_theme.value);
});

watch(
	() => theme.name.value,
	(v) => {
		cookie_theme.value = v;
	},
);

watch(
	[locale, message],
	() => {
		useHead({
			titleTemplate: (title) => [title, t("global.site_name")].filter((i) => i).join(" ⁘ "),
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
