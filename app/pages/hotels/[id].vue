<template>
	<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
		<GlobalLoading v-if="pending" />
		<GlobalError v-else-if="error" :error="error" />
		<div v-else-if="hotel" class="container mx-auto px-4 py-8">
			<button
				@click="router.back()"
				class="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
			>
				<Icon name="mdi:arrow-left" class="text-xl" />
				{{ $t("global.back") }}
			</button>

			<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
				<div class="relative h-96">
					<NuxtImg
						:src="hotel.img || '/logo/vertical.png'"
						:alt="hotel.name"
						class="w-full h-full object-cover"
					/>
					<div
						class="absolute top-4 right-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg"
					>
						<div class="flex items-center gap-1">
							<Icon
								v-for="i in hotel.rate"
								:key="i"
								name="ic:baseline-star"
								class="text-yellow-400 text-lg"
							/>
						</div>
					</div>
				</div>

				<div class="p-8">
					<div class="flex justify-between items-start mb-6">
						<div>
							<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
								{{ hotel.name }}
							</h1>
							<div class="flex items-center text-gray-600 dark:text-gray-400 gap-2">
								<Icon name="material-symbols-light:location-on" class="text-xl" />
								<span>{{ hotel.location.city }}</span>
								<span v-if="hotel.location.address"> - {{ hotel.location.address }}</span>
							</div>
						</div>
						<div class="text-right">
							<div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
								${{ hotel.price }}
							</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">
								{{ $t("hotels.per_night") }}
							</div>
						</div>
					</div>

					<div class="mb-8">
						<p class="text-gray-700 dark:text-gray-300 text-lg">{{ hotel.description }}</p>
					</div>

					<div v-if="hotel.images && hotel.images.length > 0" class="mb-8">
						<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
							{{ $t("hotels.gallery") }}
						</h2>
						<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							<div
								v-for="(image, index) in hotel.images"
								:key="index"
								class="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
							>
								<NuxtImg
									:src="image"
									:alt="`${hotel.name} - Image ${index + 1}`"
									class="w-full h-full object-cover"
								/>
							</div>
						</div>
					</div>

					<div v-if="hotel.amenities && hotel.amenities.length > 0" class="mb-8">
						<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
							{{ $t("hotels.amenities") }}
						</h2>
						<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							<div
								v-for="amenity in hotel.amenities"
								:key="amenity.id"
								class="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
							>
								<Icon :name="amenity.icon" class="text-2xl text-blue-600 dark:text-blue-400" />
								<span class="text-gray-800 dark:text-gray-200">{{ amenity[locale] }}</span>
							</div>
						</div>
					</div>

					<div class="mb-8">
						<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
							{{ $t("hotels.about") }}
						</h2>
						<div class="prose dark:prose-invert max-w-none" v-html="hotel.content"></div>
					</div>

					<div class="flex gap-4">
						<button
							class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-colors"
						>
							{{ $t("hotels.book_now") }}
						</button>
						<button
							class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-4 px-8 rounded-lg shadow-lg transition-colors"
						>
							{{ $t("hotels.contact") }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const id = route.params.id as string;

const { data: hotel } = useAsyncData(id, () =>
	useApi().get(`/hotels/${id}`, { params: { useLang: "true" } }),
);

usePageTitle("hotels.hotel_details");
</script>
