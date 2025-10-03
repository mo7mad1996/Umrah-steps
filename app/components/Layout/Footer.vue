<template>
	<footer
		class="bg-gradient-to-br from-primary to-primary-dark text-white dark:!from-primary-dark dark:!to-amber-950"
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
						<p class="text-white/80 leading-relaxed text-sm md:text-base">
							{{ $t("footer.description") }}
						</p>
					</div>

					<!-- Social Links -->
					<div class="flex gap-2 md:gap-3">
						<a
							href="#"
							class="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
						>
							<Icon name="mdi:whatsapp" class="text-lg md:text-xl" />
						</a>
						<a
							href="#"
							class="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
						>
							<Icon name="mdi:facebook" class="text-lg md:text-xl" />
						</a>
						<a
							href="#"
							class="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
						>
							<Icon name="mdi:twitter" class="text-lg md:text-xl" />
						</a>
						<a
							href="#"
							class="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
						>
							<Icon name="mdi:instagram" class="text-lg md:text-xl" />
						</a>
					</div>
				</div>

				<!-- Quick Links -->
				<div>
					<h3 class="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">
						{{ $t("nav.home") }}
					</h3>
					<ul class="space-y-2 md:space-y-3">
						<li>
							<NuxtLink
								to="/"
								class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
							>
								<Icon
									name="mdi:chevron-left"
									class="text-xs md:text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
								/>
								{{ $t("nav.home") }}
							</NuxtLink>
						</li>
						<li>
							<NuxtLink
								to="/hotels"
								class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
							>
								<Icon
									name="mdi:chevron-left"
									class="text-xs md:text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
								/>
								{{ $t("nav.hotels") }}
							</NuxtLink>
						</li>
						<li>
							<NuxtLink
								to="/about"
								class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
							>
								<Icon
									name="mdi:chevron-left"
									class="text-xs md:text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
								/>
								{{ $t("nav.about") }}
							</NuxtLink>
						</li>
						<li>
							<NuxtLink
								to="/contact"
								class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
							>
								<Icon
									name="mdi:chevron-left"
									class="text-xs md:text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
								/>
								{{ $t("nav.contact") }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<!-- Services -->
				<div>
					<h3 class="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">
						{{ $t("nav.services") }}
					</h3>
					<ul class="space-y-2 md:space-y-3">
						<li>
							<a
								href="#"
								class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
							>
								<Icon
									name="mdi:chevron-left"
									class="text-xs md:text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
								/>
								حجز الفنادق
							</a>
						</li>
						<li>
							<a
								href="#"
								class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
							>
								<Icon
									name="mdi:chevron-left"
									class="text-xs md:text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
								/>
								خدمات النقل
							</a>
						</li>
						<li>
							<a
								href="#"
								class="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group text-sm md:text-base"
							>
								<Icon
									name="mdi:chevron-left"
									class="text-xs md:text-sm group-hover:translate-x-1 transition-transform rtl:rotate-180"
								/>
								برامج العمرة
							</a>
						</li>
					</ul>
				</div>

				<!-- Contact Info -->
				<div>
					<h3 class="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">
						{{ $t("contact.title") }}
					</h3>
					<div class="space-y-3 md:space-y-4">
						<div class="flex items-start gap-3">
							<Icon
								name="mdi:map-marker"
								class="text-secondary mt-1 flex-shrink-0 text-sm md:text-base"
							/>
							<div class="text-white/80 text-xs md:text-sm leading-relaxed">
								المملكة العربية السعودية<br />
								مكة المكرمة - حي العزيزية
							</div>
						</div>

						<div class="flex items-center gap-3">
							<Icon name="mdi:phone" class="text-secondary flex-shrink-0 text-sm md:text-base" />
							<div class="text-white/80 text-xs md:text-sm" dir="ltr">+966 12 345 6789</div>
						</div>

						<div class="flex items-center gap-3">
							<Icon name="mdi:email" class="text-secondary flex-shrink-0 text-sm md:text-base" />
							<div class="text-white/80 text-xs md:text-sm">info@khatwat-almutamir.com</div>
						</div>

						<div class="flex items-start gap-3">
							<Icon
								name="mdi:clock"
								class="text-secondary mt-1 flex-shrink-0 text-sm md:text-base"
							/>
							<div class="text-white/80 text-xs md:text-sm leading-relaxed">
								السبت - الخميس: 8:00 ص - 10:00 م<br />
								الجمعة: 2:00 م - 10:00 م
							</div>
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
const showBackToTop = ref(false);

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

const handleScroll = () => {
	showBackToTop.value = window.scrollY > 300;
};

onMounted(() => {
	window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
	window.removeEventListener("scroll", handleScroll);
});
</script>
