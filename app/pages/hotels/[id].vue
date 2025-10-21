<template>
	<div>
		<GlobalLoading v-if="status == 'pending'" />
		<GlobalError :status="status" :error="error" :refresh="refresh" />
		<div v-if="status == 'success'">
			<GlobalImageMask :src="hotel.img" />
			<GlobalPageTitle :title="hotel.name" :sub-title="hotel.location.city" />

			<div class="container mx-auto">
				<nuxt-img
					:src="hotel.img"
					:alt="hotel.name"
					class="w-full md:!w-3/4 mx-auto relative z-10 aspect-video block rounded-2xl shadow-2xl"
				/>

				<div class="sticky top-32 bottom-4 z-50 grid container mx-auto my-4 md:grid-cols-4">
					<InputsBtn
						:text="$t('hotels.book')"
						@click="goToWhatsapp"
						icon="material-symbols:whatsapp"
					/>
				</div>
				<!-- ok here -->

				<div class="flex flex-col gap-2 w-fit text-md max-md:text-sm z-50 my-4 mx-auto">
					<div
						class="cursor-default flex items-center justify-between w-full rounded-lg bg-slate-700 dark:bg-slate-900 px-4 py-1"
					>
						<div class="flex gap-2 items-center">
							<div
								class="text-emerald-500 dark:bg-white/5 backdrop-blur-xl p-2 rounded-lg flex justify-center items-center"
							>
								<Icon name="material-symbols:location-on-outline" class="text-3xl" />
							</div>
							<div>
								<p class="text-white">{{ hotel.location.city }}</p>
								<p class="text-gray-500 p-1">{{ hotel.location.address }}</p>
							</div>
						</div>
					</div>
				</div>

				<section class="gap-2 md:grid-cols-2 grid my-12">
					<div class="p-6 bg-white dark:!bg-neutral-100/10 shadow-xl rounded-lg">
						<h3 class="text-xl opacity-70 dark:text-gray-400">
							{{ $t("dashboard.hotel.description_section") }}
						</h3>
						<p class="opacity-70 text-ellipsis overflow-hidden my-6 dark:text-gray-50">
							{{ hotel.description }}
						</p>
					</div>
					<div class="p-6 bg-white dark:!bg-neutral-100/10 shadow-xl rounded-lg">
						<h3 class="text-xl opacity-70 dark:text-gray-400">
							{{ $t("dashboard.hotel.min_price") }}
						</h3>
						<div class="text-3xl text-center my-24 dark:text-gray-50">
							{{
								new Intl.NumberFormat(`${locale}-SA`, {
									style: "currency",
									currency: "SAR",
								}).format(hotel.price)
							}}
							<div class="flex items-center justify-center my-4">
								<Icon
									name="material-symbols:star"
									v-for="i in 5"
									:key="i"
									class="text-lg"
									:class="{
										'text-yellow-400': hotel.rate >= i,
										'text-gray-400': hotel.rate < i,
									}"
								/>
							</div>
						</div>
					</div>
				</section>

				<section class="p-6 rounded-lg flex gap-6 justify-center wrap">
					<div
						v-for="amenity in hotel.amenities"
						:key="amenity.id"
						class="flex items-center rounded-3xl p-1 px-4 gap-3 bg-indigo-600/10 dark:bg-indigo-100/70 text-indigo-600"
					>
						<Icon :name="amenity.icon" class="text-xl font-bold" />
						<span>{{ amenity[locale] }}</span>
					</div>
				</section>
				<section
					class="p-6 bg-white dark:!bg-neutral-100/10 mb-24"
					v-html="hotel.content"
				></section>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
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

// Global Data
const { data: globalData, status: globalDataStatus } = useAsyncData("globalData", () =>
	useApi()
		.get("/globalData")
		.then((d) => d.data),
);

usePageTitle("hotels.hotel_details");
const goToWhatsapp = () => {
	console.log(globalData?.value?.mainPhone, hotel.value.name);
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
		`https://wa.me/${globalData.value.mainPhone.replace("+", "")}`.replaceAll(" ", "") +
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
