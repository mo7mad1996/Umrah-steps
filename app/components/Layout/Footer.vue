<template>
	<footer
		class="bg-gradient-to-br from-primary/90 to-primary-dark/90 text-white dark:!from-primary-dark/90 dark:!to-amber-950/90"
	>
		<!-- Main Footer Content -->
		<div class="container mx-auto px-4 md:px-6 py-12 md:py-16">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
				<!-- Company Info -->
				<div class="lg:col-span-1">
					<div class="mb-6">
						<NuxtImg
							src="/logo/horizontal.png"
							height="60"
							:alt="$t('global.site_name')"
							class="mb-4 h-12 md:h-16"
						/>
						<p
							class="text-white/80 leading-relaxed text-sm md:text-base"
							v-if="PageContentStatus == 'success'"
						>
							{{ pageContent.content.subheading[locale] }}
						</p>
					</div>
					<!-- Social Links -->
					<LazyPagesContactSocialMedia />
				</div>

				<!-- Quick Links -->
				<div>
					<h3 class="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">
						{{ $t("nav.home") }}
					</h3>
					<ul class="space-y-2 md:space-y-3">
						<li v-for="link in pages" :key="link.to">
							<NuxtLink
								:to="link.to"
								class="text-white/80 hover:!text-secondary transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
							>
								<Icon
									name="mdi:chevron-right"
									class="text-xs md:text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
								/>
								{{ $t(link.title) }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<!-- Services -->
				<div>
					<h3 class="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">
						{{ $t("global.trusted") }}
					</h3>
					<div class="space-y-2 md:space-y-3">
						{{ $t("global.site_name") }} {{ $t("global.trusted_by") }}
					</div>

					<NuxtLink
						v-if="
							globalDataStatus == 'success' &&
							globalData.commercial_registration &&
							globalData.commercial_registration_link
						"
						external
						:to="globalData.commercial_registration_link"
						class="block w-full p-2 my-2"
					>
						<NuxtImg class="w-full block" :src="globalData.commercial_registration" />
					</NuxtLink>
				</div>

				<!-- Contact Info -->
				<div>
					<h3 class="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">
						{{ $t("contact.title") }}
					</h3>
					<div class="space-y-3 md:space-y-4" v-if="globalDataStatus == 'success'">
						<div class="flex items-center gap-3" v-if="globalData.mainPhone">
							<Icon name="mdi:phone" class="text-secondary flex-shrink-0 text-sm md:text-base" />
							<div class="text-white/80 text-xs md:text-sm" dir="ltr">
								{{ globalData.mainPhone }}
							</div>
						</div>

						<div class="flex items-center gap-3" v-if="globalData.mainEmail">
							<Icon name="mdi:email" class="text-secondary flex-shrink-0 text-sm md:text-base" />
							<div class="text-white/80 text-xs md:text-sm">{{ globalData.mainEmail }}</div>
						</div>

						<div class="flex items-start gap-3" v-if="'success' == workHoursStatus">
							<Icon
								name="mdi:clock"
								class="text-secondary mt-1 flex-shrink-0 text-sm md:text-base"
							/>
							<ul class="text-white/80 text-xs md:text-sm leading-relaxed">
								<li v-for="hour in workHours" :key="hour.day">{{ hour.day }}: {{ hour.time }}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="border-t border-white/10 bg-black/20">
			<div class="container mx-auto px-4 md:px-6 py-4 md:py-6">
				<div class="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
					<div class="text-white/80 text-xs md:text-sm text-center md:text-right">
						© {{ new Date().getFullYear() }} {{ $t("global.site_name") }}.
						{{ $t("footer.rights") }}
					</div>

					<div class="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm">
						<a href="#" class="text-white/80 hover:text-white transition-colors duration-300">
							سياسة الخصوصية
						</a>
						<a href="#" class="text-white/80 hover:text-white transition-colors duration-300">
							الشروط والأحكام
						</a>
						<a href="#" class="text-white/80 hover:text-white transition-colors duration-300">
							اتفاقية الاستخدام
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Floating Back to Top Button -->
		<button
			@click="scrollToTop"
			:class="{ 'opacity-0 pointer-events-none': !showBackToTop }"
			class="fixed bottom-4 md:bottom-6 ltr:right-4 ltr:md:right-6 rtl:left-4 rtl:md:left-6 w-10 h-10 md:w-12 md:h-12 bg-primary-dark hover:bg-primary/90 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 focus-within:scale-110 z-50"
		>
			<Icon name="mdi:chevron-up" class="text-lg md:text-xl text-white" />
		</button>
	</footer>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const pages = [
	{ title: "nav.home", to: "/" },
	{ title: "nav.hotels", to: "/hotels" },
	{ title: "nav.about", to: "/about" },
	{ title: "nav.contact", to: "/contact" },
];

const showBackToTop = ref(false);

const goto = useGoTo({
	duration: 500,
});

const scrollToTop = () => {
	goto(0);
};

const handleScroll = () => {
	showBackToTop.value = window.scrollY > 300;
};

onMounted(() => {
	if (import.meta.client) window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
	if (import.meta.client) window.removeEventListener("scroll", handleScroll);
});

const { data: pageContent, status: PageContentStatus } = useAsyncData("pageContent-home", () =>
	useApi()
		.get("/page-content/home")
		.then((d) => d.data),
);

// Global Data
const { data: globalData, status: globalDataStatus } = useAsyncData("globalData", () =>
	useApi()
		.get("/globalData")
		.then((d) => d.data),
);

// Work Hours
const {
	data: workHours,
	status: workHoursStatus,
	error: workHoursError,
	refresh: refreshWorkHours,
} = useAsyncData(
	"workHours",
	() =>
		useApi()
			.get("workHours")
			.then((d) => d.data),
	{ watch: [locale] },
);
</script>
