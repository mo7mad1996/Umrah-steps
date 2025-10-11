<template>
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

			<section class="md:grid-cols-2 grid my-12">
				<div>
					<h3>{{ $t("dashboard.hotel.description_section") }}</h3>
					<p class="opacity-70 text-ellipsis overflow-hidden my-24">{{ hotel.description }}</p>
				</div>
				<div>
					<h3>{{ $t("dashboard.hotel.min_price") }}</h3>
					<div class="text-3xl text-center my-24">
						{{
							new Intl.NumberFormat(locale, { style: "currency", currency: "SAR" }).format(
								hotel.price,
							)
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
			<section
				class="my-24 p-6 rounded bg-neutral-200 dark:bg-neutral-100/30"
				v-html="hotel.content"
			></section>
		</div>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
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

usePageTitle("hotels.hotel_details");
</script>
