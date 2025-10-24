<template>
	<div>
		<GlobalLoading v-if="status == 'pending'" />
		<GlobalError :status="status" :error="error" :refresh="refresh" />

		<template v-if="status == 'success'">
			<GlobalImageMask :src="hotel.img" />
			<GlobalPageTitle :title="hotel.name" :sub-title="hotel.location.city" />

			<div class="container mx-auto px-4 relative z-30">
				<NuxtImg :src="hotel.img" class="container mx-auto max-w-screen-md shadow-lg my-4" />

				<div class="bg-white dark:!bg-slate-700 rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
					<h1 class="mb-8 text-3xl opacity-80 text-center font-bold">{{ hotel.name }}</h1>
					<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
						<div>
							<p class="text-gray-600 dark:text-gray-400 text-sm mb-2">
								{{ $t("dashboard.hotel.min_price") }}
							</p>
							<p class="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
								{{
									new Intl.NumberFormat(`${locale}-SA`, {
										style: "currency",
										currency: "SAR",
									}).format(hotel.price)
								}}
							</p>
							<p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
								{{ $t("hotels.per_night") || "لكل ليلة" }}
							</p>
						</div>

						<InputsBtn
							:text="$t('hotels.book')"
							@click="goToWhatsapp"
							icon="material-symbols:whatsapp"
							class="w-full md:w-auto text-lg px-8 py-4"
						/>
					</div>
				</div>

				<div class="grid md:grid-cols-3 gap-8 mb-12 relative">
					<div class="md:col-span-2 space-y-8">
						<section class="bg-white dark:!bg-slate-700 rounded-lg shadow p-6">
							<h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
								{{ $t("dashboard.hotel.description_section") }}
							</h2>
							<p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
								{{ hotel.description }}
							</p>
						</section>

						<section class="bg-white dark:!bg-white/30 rounded-lg shadow p-6">
							<h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
								{{ $t("hotels.amenities") }}
							</h2>
							<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
								<div
									v-for="amenity in hotel.amenities"
									:key="amenity.id"
									class="flex items-center gap-3 p-4 rounded bg-teal-600/20 shadow-lg dark:!bg-white/10 hover:bg-emerald-500/60 dark:hover:bg-emerald-900/20 transition-colors"
								>
									<div
										class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
									>
										<Icon :name="amenity.icon" class="text-xl" />
									</div>
									<span class="text-gray-700 dark:text-gray-300 text-sm font-medium">{{
										amenity[locale]
									}}</span>
								</div>
							</div>
						</section>

						<section
							v-if="hotel.content"
							class="bg-white dark:!bg-neutral-800 rounded-lg shadow p-6 prose dark:prose-invert max-w-none"
							v-html="hotel.content"
						></section>
					</div>

					<div class="space-y-6 sticky top-4">
						<div class="bg-white dark:!bg-violet-950 rounded-lg shadow p-6">
							<h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
								{{ $t("hotels.location") || "الموقع" }}
							</h3>
							<div class="space-y-4">
								<div class="flex items-start gap-3">
									<div
										class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
									>
										<Icon name="material-symbols:location-on" class="text-xl" />
									</div>
									<div>
										<p class="font-medium text-gray-800 dark:text-gray-100">
											{{ hotel.location.city }}
										</p>
										<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
											{{ hotel.location.address }}
										</p>
									</div>
								</div>

								<div
									class="bg-gradient-to-br from-cyan-500/60 to-emerald-600 dark:from-violet-800 dark:to-teal-500 rounded p-4 text-white"
								>
									<h3 class="text-xl font-bold mb-3">
										{{ $t("hotels.best_price") }}
									</h3>
									<p class="text-emerald-50 text-sm">
										{{ $t("hotels.best_price_desc") }}
									</p>
								</div>

								<div class="pt-4 border-t border-gray-200 dark:border-neutral-800">
									<InputsBtn
										:text="$t('hotels.book_now')"
										@click="goToWhatsapp"
										icon="material-symbols:whatsapp"
										class="w-full"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Swiper
					v-if="hotel.images && hotel.images.length > 0"
					:modules="[Autoplay, EffectFade, Pagination]"
					:slides-per-view="3"
					:loop="true"
					:effect="'fade'"
					:autoplay="{
						delay: 4000,
						disableOnInteraction: false,
					}"
					:pagination="{
						clickable: true,
					}"
					class="h-full w-full"
				>
					<SwiperSlide v-for="(image, index) in hotel.images" :key="index">
						<nuxt-img
							:src="image"
							:alt="`${hotel.name} - صورة ${index + 1}`"
							class="w-full h-full object-cover"
						/>
					</SwiperSlide>
				</Swiper>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

const route = useRoute();
const { locale, t } = useI18n();
const id = route.params.id as string;
const {
	data: hotel,
	status,
	error,
	refresh,
} = useAsyncData(
	() => id + locale.value,
	() =>
		useApi()
			.get(`/hotels/${id}`, { params: { useLang: "true", includes: "location.city amenities" } })
			.then((d) => d.data),
	{ watch: [locale] },
);
const { data: globalData, status: globalDataStatus } = useGlobalData();

usePageTitle("hotels.hotel_details");

const goToWhatsapp = () => {
	if (!globalData?.value?.mainPhone || !hotel?.value?.name) {
		console.error("Hotel data or phone number is missing");
		return;
	}

	const text = `السلام عليكم
	\n
كنت أتصفح موقع ${t("global.site_name")} \n
وأعجبني هذا الفندق:
 ${hotel.value.name}
\n
رابط الفندق: ${window.location.href}
\n
\n

أرغب بالتواصل بشكل عاجل لإتمام الحجز
  `;
	const url =
		`${globalData.value.mainWhasapp.replace("+", "")}`.replaceAll(" ", "") +
		`?text=${encodeURIComponent(text)}`;
	window.open(url, "_blank");
};

useSeoMeta({
	ogImage: () => hotel.value?.image,
	ogImageUrl: () => hotel.value?.image,
	twitterImage: () => hotel.value?.image,
	twitterDescription: () => hotel.value?.description,
	description: () => hotel.value?.description,
	keywords: () => hotel.value?.name,
});
</script>

<style>
.swiper-pagination-bullet {
	@apply bg-white/70 w-3 h-3;
}

.swiper-pagination-bullet-active {
	@apply bg-white;
}

.prose img {
	@apply rounded-lg shadow-lg;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
	@apply text-gray-800 dark:text-gray-100;
}

.prose p {
	@apply text-gray-600 dark:text-gray-300;
}
</style>
