<template>
	<div class="fixed top-0 w-full z-50">
		<header
			class="container ltr:bg-gradient-to-tr backdrop-blur-sm rtl:bg-gradient-to-tl from-primary-dark to-primary/80 mx-auto dark:!to-background-dark md:my-4 p-2 md:rounded-lg shadow-xl transition-colors duration-300"
		>
			<div class="flex gap-2 md:gap-5 items-stretch justify-between ltr:flex-row-reverse">
				<!-- this is a comment -->
				<NuxtLink to="/" class="block">
					<NuxtImg
						src="/logo/horizontal.png"
						height="60"
						class="h-12 md:h-16"
						:alt="$t('global.site_name')"
					/>
				</NuxtLink>

				<nav class="-my-1 md:-my-2 hidden md:block">
					<ul class="flex mx-auto w-fit h-full gap-1 md:gap-2">
						<li v-for="(link, n) in links" :key="n">
							<NuxtLink
								:to="link.to"
								:title="link.title"
								exactActiveClass="!text-yellow-300   after:w-full font-bold "
								class="text-white px-2 md:px-4 flex flex-col gap-1 items-center justify-center py-1 h-full hover:!text-secondary after:w-0 after:h-1 after:bg-secondary after:block after:absolute relative after:bottom-0 after:rounded-t-full after:transition-all after:duration-300 text-sm md:text-base"
							>
								{{ $t(link.title) }}
							</NuxtLink>
						</li>
					</ul>
				</nav>

				<v-btn-group
					variant="plain"
					class="text-white has-[ul]:!overflow-x-visible has-[ul]:!overflow-y-visible !h-auto ltr:flex-row-reverse gap-1"
				>
					<v-btn @click="() => theme.toggle()" size="small" class="min-w-0 p-2">
						<transition name="dark">
							<Icon
								v-if="theme.name.value == 'light'"
								class="text-lg md:text-2xl"
								name="line-md:sunny-filled-loop-to-moon-filled-loop-transition"
							></Icon>
							<Icon
								v-else
								name="line-md:moon-filled-alt-to-sunny-filled-loop-transition"
								class="text-lg md:text-2xl"
							></Icon>
						</transition>
					</v-btn>
					<InputsSelect
						@update="changeLang"
						v-model="locale"
						:items="
							locales.map((p: any) => ({
								title: p.name,
								value: p.code,
							}))
						"
						class="relative"
						menuClass="top-full !bg-surface dark:!bg-surface-dark text-white py-1 min-w-32"
						customClass="!bg-transparent !rounded-none text-white min-w-0"
						itemClass="group-hover:!bg-white/20 !text-white"
						activeClass="!bg-accent/10 rounded text-blue-400 after:w-2 after:aspect-square after:bg-secondary-dark  after:block after:rounded flex items-center gap-2 justify-between"
					>
						<template #activator="props">
							<v-btn v-bind="props" class="!h-full relative min-w-0 p-2" size="small">
								<Icon name="lucide:languages" class="text-lg md:text-2xl"></Icon>
							</v-btn>
						</template>
					</InputsSelect>

					<!-- Mobile Menu Button -->
					<v-btn
						@click="showMobileMenu = !showMobileMenu"
						size="small"
						class="min-w-0 p-2 md:!hidden"
					>
						<Icon name="mdi:menu" class="text-lg" />
					</v-btn>
				</v-btn-group>
			</div>

			<!-- Mobile Navigation -->
			<nav v-if="showMobileMenu" class="md:!hidden mt-4 pt-4 border-t border-white/20">
				<ul class="flex flex-col gap-2">
					<li v-for="(link, n) in links" :key="n">
						<NuxtLink
							:to="link.to"
							:title="link.title"
							@click="showMobileMenu = false"
							exactActiveClass="!text-yellow-300 font-bold"
							class="text-white px-4 py-2 block hover:!text-yellow-300 hover:bg-white/10 rounded transition-all"
						>
							{{ $t(link.title) }}
						</NuxtLink>
					</li>
				</ul>
			</nav>
		</header>
	</div>
</template>

<script lang="ts" setup>
const { locales, setLocale, locale: l } = useI18n();
const showMobileMenu = ref(false);

const links = [
	{ to: "/", title: "nav.home" },
	{ to: "/hotels", title: "nav.hotels" },
	{ to: "/about", title: "nav.about" },
	{ to: "/contact", title: "nav.contact" },
];

const locale = ref(l.value);
const changeLang = ({ value }: any) => setLocale(value);

const theme = useTheme();

// Close mobile menu when route changes
const route = useRoute();
watch(
	() => route.path,
	() => {
		showMobileMenu.value = false;
	},
);
</script>

<style>
.dark-enter-active,
.dark-leave-active {
	transition: 0.5s ease !important;

	@apply h-full absolute;
}

.dark-enter-from {
	transform: translateY(-100%) !important;
}
.dark-leave-to {
	transform: translateY(100%) !important;
}
</style>
