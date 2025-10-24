<template>
	<div>
		<GlobalLoading v-if="status == 'pending'" />
		<GlobalError :status="status" :error="error" :refresh="refresh" />

		<template v-if="status == 'success'">
			<GlobalImageMask :src="hotel.img" />
			<GlobalPageTitle :title="hotel.name" :sub-title="hotel.location.city" />

			<div class="container mx-auto px-4 relative z-30">
				<NuxtImg
					:src="hotel.img"
					class="container mx-auto max-w-screen-md shadow-lg my-4 cursor-pointer rounded-xl hover:shadow-2xl transition-shadow"
					@click="openLightbox(hotel.img)"
				/>

				<div class="bg-white dark:!bg-violet-950 rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
					<h1
						class="mb-8 text-3xl opacity-80 text-center font-bold text-gray-800 dark:text-gray-100"
					>
						{{ hotel.name }}
					</h1>
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
						<section class="bg-white dark:!bg-violet-950 rounded-lg shadow p-6">
							<h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
								{{ $t("dashboard.hotel.description_section") }}
							</h2>
							<p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
								{{ hotel.description }}
							</p>
						</section>

						<section class="bg-white dark:!bg-violet-950 rounded-lg shadow p-6">
							<h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
								{{ $t("hotels.amenities") }}
							</h2>
							<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
								<div
									v-for="amenity in hotel.amenities"
									:key="amenity.id"
									class="flex items-center gap-3 p-4 rounded-lg bg-teal-600/20 shadow-lg dark:!bg-white/10 hover:bg-emerald-500/60 dark:hover:bg-emerald-900/20 transition-colors"
								>
									<div
										class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
									>
										<Icon :name="amenity.icon" class="text-xl" />
									</div>
									<span class="text-gray-700 dark:text-gray-300 text-sm font-medium">
										{{ amenity[locale] }}
									</span>
								</div>
							</div>
						</section>

						<section
							v-if="hotel.content"
							class="bg-white dark:!bg-violet-950 rounded-lg shadow p-6 prose dark:prose-invert max-w-none"
							v-html="hotel.content"
						></section>
					</div>

					<div class="space-y-6">
						<div class="bg-white dark:!bg-violet-950 rounded-lg shadow p-6 sticky top-4">
							<h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
								{{ $t("hotels.location") }}
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

				<section v-if="hotel.images.length > 0" class="mb-12">
					<h2 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
						{{ $t("hotels.gallery") }}
					</h2>

					<div class="bg-white dark:!bg-slate-700 rounded shadow p-6">
						<Swiper
							:modules="[Autoplay, Navigation, Pagination, Thumbs]"
							:slides-per-view="1"
							:space-between="30"
							:loop="true"
							:autoplay="{
								delay: 5000,
								disableOnInteraction: false,
							}"
							:navigation="true"
							:pagination="{
								clickable: true,
								dynamicBullets: true,
							}"
							:thumbs="{ swiper: thumbsSwiper }"
							class="gallery-swiper mb-4"
							@swiper="setMainSwiper"
						>
							<SwiperSlide v-for="(image, index) in hotel.images" :key="index">
								<div
									class="relative flex items-center justify-center aspect-video rounded overflow-hidden group cursor-pointer"
								>
									<NuxtImg
										:src="image"
										:alt="`${hotel.name} - صورة ${index + 1}`"
										class="inset-0 object-cover w-full h-full opacity-30 block blur-3xl absolute z-10"
										@click="openLightbox(image, index)"
									/>
									<NuxtImg
										:src="image"
										:alt="`${hotel.name} - صورة ${index + 1}`"
										class="w-full h-full block object-contain relative z-20 rounded shadow"
										@click="openLightbox(image, index)"
									/>
								</div>
							</SwiperSlide>
						</Swiper>

						<Swiper
							:modules="[Navigation, Thumbs]"
							:slides-per-view="3"
							:space-between="10"
							:breakpoints="{
								640: { slidesPerView: 4 },
								768: { slidesPerView: 5 },
								1024: { slidesPerView: 6 },
							}"
							:watch-slides-progress="true"
							class="thumbs-swiper"
							@swiper="setThumbsSwiper"
						>
							<SwiperSlide v-for="(image, index) in hotel.images" :key="index">
								<div
									class="aspect-video overflow-hidden cursor-pointer border-transparent ring-emerald-800 transition-all"
								>
									<NuxtImg
										:src="image"
										:alt="`${hotel.name} - صورة مصغرة ${index + 1}`"
										class="w-full h-full object-cover block"
									/>
								</div>
							</SwiperSlide>
						</Swiper>
					</div>
				</section>
			</div>
		</template>

		<Teleport to="body">
			<Transition name="lightbox">
				<div
					v-if="lightboxOpen"
					class="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
					@click="closeLightbox"
				>
					<button
						class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
						@click="closeLightbox"
					>
						<Icon name="material-symbols:close" class="text-4xl" />
					</button>

					<button
						v-if="hotel.images && hotel.images.length > 1"
						class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-white/10 rounded-full p-3 backdrop-blur-sm hover:bg-white/20"
						@click.stop="previousImage"
					>
						<Icon name="material-symbols:chevron-left" class="text-4xl" />
					</button>

					<button
						v-if="hotel.images && hotel.images.length > 1"
						class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-white/10 rounded-full p-3 backdrop-blur-sm hover:bg-white/20"
						@click.stop="nextImage"
					>
						<Icon name="material-symbols:chevron-right" class="text-4xl" />
					</button>

					<div
						class="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
						@click.stop
					>
						<Transition name="fade" mode="out-in">
							<NuxtImg
								:key="currentLightboxImage"
								:src="currentLightboxImage"
								:alt="hotel.name"
								class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
							/>
						</Transition>
					</div>

					<div
						v-if="hotel.images && hotel.images.length > 1"
						class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-lg bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
					>
						{{ currentImageIndex + 1 }} / {{ hotel.images.length }}
					</div>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

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

const thumbsSwiper = ref<SwiperType | null>(null);
const mainSwiper = ref<SwiperType | null>(null);
const lightboxOpen = ref(false);
const currentLightboxImage = ref("");
const currentImageIndex = ref(0);

const setThumbsSwiper = (swiper: SwiperType) => {
	thumbsSwiper.value = swiper;
};

const setMainSwiper = (swiper: SwiperType) => {
	mainSwiper.value = swiper;
};

const openLightbox = (image: string, index: number = 0) => {
	currentLightboxImage.value = image;
	currentImageIndex.value = index;
	lightboxOpen.value = true;
	document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
	lightboxOpen.value = false;
	document.body.style.overflow = "";
};

const nextImage = () => {
	if (hotel.value?.images && hotel.value.images.length > 0) {
		currentImageIndex.value = (currentImageIndex.value + 1) % hotel.value.images.length;
		currentLightboxImage.value = hotel.value.images[currentImageIndex.value];
	}
};

const previousImage = () => {
	if (hotel.value?.images && hotel.value.images.length > 0) {
		currentImageIndex.value =
			currentImageIndex.value === 0 ? hotel.value.images.length - 1 : currentImageIndex.value - 1;
		currentLightboxImage.value = hotel.value.images[currentImageIndex.value];
	}
};

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

onUnmounted(() => {
	document.body.style.overflow = "";
});

useSeoMeta({
	ogImage: () => hotel.value?.image,
	ogImageUrl: () => hotel.value?.image,
	twitterImage: () => hotel.value?.image,
	twitterDescription: () => hotel.value?.description,
	description: () => hotel.value?.description,
	keywords: () => hotel.value?.name,
});
</script>

<style scoped>
.thumbs-swiper {
	height: 100px;
	box-sizing: border-box;
}

.thumbs-swiper :deep(.swiper-slide) {
	opacity: 0.4;
	transition: opacity 0.3s;
}

.thumbs-swiper :deep(.swiper-slide-thumb-active) {
	opacity: 1;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
	color: transparent;
	background: rgba(255, 255, 255, 0.116);
	backdrop-filter: blur(20px);
	width: 50px;
	height: 50px;
	border-radius: 50%;
	transition: all 0.3s;
}

:deep(.swiper-button-next)::after,
:deep(.swiper-button-prev)::after {
	background-clip: text;
	background-color: blue;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
	background: rgba(31, 41, 119, 0.671);
	transform: scale(1.01);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
	font-size: 20px;
	font-weight: bold;
}

:deep(.swiper-pagination-bullets) {
	width: fit-content !important;
	gap: 2px;
	padding: 5px;
	backdrop-filter: blur(20px);
	display: flex;
}
:deep(.swiper-pagination-bullet) {
	width: 10px;
	height: 3px;
	position: static !important;
	border-radius: 10px;
	background: gray;
	opacity: 0.6;
	flex: 1;
	margin: 0px !important;
	transform: scale(1) !important;
	transition: all 0.3s !important;
}

:deep(.swiper-pagination-bullet-active) {
	opacity: 1;
	background: #a01981;
	flex: 2;
	width: 20px !important;
}

.lightbox-enter-active,
.lightbox-leave-active {
	transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.prose img {
	border-radius: 0.5rem;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
	color: #1f2937;
}

.dark .prose h1,
.dark .prose h2,
.dark .prose h3,
.dark .prose h4,
.dark .prose h5,
.dark .prose h6 {
	color: #f3f4f6;
}

.prose p {
	color: #4b5563;
}

.dark .prose p {
	color: #d1d5db;
}
</style>
