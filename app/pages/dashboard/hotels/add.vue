<template>
	<div>
		<LazyLayoutDashboardContent>
			<template #header>
				<LayoutDashboardPageTitle
					:title="$t('dashboard.hotel.add')"
					:subTitle="$t('dashboard.hotels')"
					:buttons="[
						{
							text: $t('global.back'),
							to: '/dashboard/hotels',
							icon: 'tabler:arrow-back',
						},
					]"
				/>
			</template>

			<template v-slot="">
				<Form @submit="onSubmit" class="space-y-8">
					<!-- Basic Information Section -->
					<section>
						<h3
							class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
						>
							<Icon name="mdi:information" />
							{{ $t("dashboard.hotel.basic_info") }}
						</h3>

						<div class="grid md:grid-cols-2 gap-6">
							<!-- Hotel Name Arabic -->
							<InputsText
								v-model="form.name.ar"
								name="name_ar"
								rules="required"
								:placeholder="$t('dashboard.hotel.name.ar')"
								:title="$t('dashboard.hotel.name.ar')"
								icon="mdi:translate"
							/>

							<!-- Hotel Name English -->
							<InputsText
								v-model="form.name.en"
								name="name_en"
								rules="required"
								:placeholder="$t('dashboard.hotel.name.en')"
								:title="$t('dashboard.hotel.name.en')"
								icon="mdi:translate"
							/>

							<!-- Description Arabic -->
							<InputsTextarea
								v-model="form.description.ar"
								name="description_ar"
								rules="required"
								:placeholder="$t('dashboard.hotel.description_placeholder.ar')"
								:title="$t('dashboard.hotel.description.ar')"
								:rows="4"
							/>

							<!-- Description English -->
							<InputsTextarea
								v-model="form.description.en"
								name="description_en"
								rules="required"
								:placeholder="$t('dashboard.hotel.description_placeholder.en')"
								:title="$t('dashboard.hotel.description.en')"
								:rows="4"
							/>
						</div>
					</section>

					<div class="grid md:grid-cols-2 gap-6">
						<!-- Hotel Rating -->
						<InputsSelect
							v-model="form.rate"
							name="rate"
							rules="required"
							:title="$t('dashboard.hotel.rating')"
							:placeholder="$t('dashboard.hotel.rating')"
							:items="[
								{ value: 1, title: '1 ' + $t('dashboard.hotel.star') },
								{ value: 2, title: '2 ' + $t('dashboard.hotel.stars') },
								{ value: 3, title: '3 ' + $t('dashboard.hotel.stars') },
								{ value: 4, title: '4 ' + $t('dashboard.hotel.stars') },
								{ value: 5, title: '5 ' + $t('dashboard.hotel.stars') },
							]"
							icon="mdi:star"
						/>

						<!-- Hotel Status -->
						<InputsSelect
							:title="$t('dashboard.hotel.status')"
							v-model="form.status"
							name="status"
							rules="required"
							:placeholder="$t('dashboard.hotel.status')"
							:items="[
								{ value: 'active', title: $t('dashboard.hotel.status_active') },
								{ value: 'inactive', title: $t('dashboard.hotel.status_inactive') },
							]"
							icon="mdi:check-circle"
						/>
					</div>

					<!-- Location Section -->
					<section>
						<h3
							class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
						>
							<Icon name="mdi:map-marker" class="text-primary" />
							{{ $t("dashboard.hotel.location_section") }}
						</h3>

						<div class="grid md:grid-cols-2 gap-6">
							<!-- City Arabic -->
							<InputsText
								v-model="form.location.city.ar"
								name="city_ar"
								rules="required"
								:placeholder="$t('dashboard.hotel.city.ar')"
								icon="mdi:city"
							/>

							<!-- City English -->
							<InputsText
								v-model="form.location.city.en"
								name="city_en"
								rules="required"
								:placeholder="$t('dashboard.hotel.city.en')"
								icon="mdi:city"
							/>

							<!-- Address Arabic -->
							<InputsText
								v-model="form.address.ar"
								name="address_ar"
								:placeholder="$t('dashboard.hotel.address.ar')"
								icon="mdi:map-marker"
							/>

							<!-- Address English -->
							<InputsText
								v-model="form.address.en"
								name="address_en"
								:placeholder="$t('dashboard.hotel.address.en')"
								icon="mdi:map-marker"
							/>
						</div>
					</section>

					<!-- Amenities Section -->
					<section>
						<h3
							class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
						>
							<Icon name="mdi:star-box" class="text-primary" />
							{{ $t("dashboard.hotel.amenities_section") }}
						</h3>

						<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							<InputsCheckbox
								v-model="form.amenities.wifi"
								name="wifi"
								:title="$t('dashboard.hotel.amenities.wifi')"
							/>
							<InputsCheckbox
								v-model="form.amenities.parking"
								name="parking"
								:title="$t('dashboard.hotel.amenities.parking')"
							/>
							<InputsCheckbox
								v-model="form.amenities.pool"
								name="pool"
								:title="$t('dashboard.hotel.amenities.pool')"
							/>
							<InputsCheckbox
								v-model="form.amenities.gym"
								name="gym"
								:title="$t('dashboard.hotel.amenities.gym')"
							/>
							<InputsCheckbox
								v-model="form.amenities.restaurant"
								name="restaurant"
								:title="$t('dashboard.hotel.amenities.restaurant')"
							/>
							<InputsCheckbox
								v-model="form.amenities.spa"
								name="spa"
								:title="$t('dashboard.hotel.amenities.spa')"
							/>
							<InputsCheckbox
								v-model="form.amenities.room_service"
								name="room_service"
								:title="$t('dashboard.hotel.amenities.room_service')"
							/>
							<InputsCheckbox
								v-model="form.amenities.laundry"
								name="laundry"
								:title="$t('dashboard.hotel.amenities.laundry')"
							/>
						</div>
					</section>

					<!-- Pricing Section -->
					<section>
						<h3
							class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
						>
							<Icon name="mdi:currency-usd" class="text-primary" />
							{{ $t("dashboard.hotel.pricing_section") }}
						</h3>

						<div class="grid md:grid-cols-3 gap-6">
							<InputsText
								v-model="form.pricing.min_price"
								name="min_price"
								type="number"
								rules="required"
								:placeholder="$t('dashboard.hotel.min_price')"
								icon="mdi:currency-usd"
							/>
							<InputsText
								v-model="form.pricing.max_price"
								name="max_price"
								type="number"
								rules="required"
								:placeholder="$t('dashboard.hotel.max_price')"
								icon="mdi:currency-usd"
							/>
							<InputsSelect
								v-model="form.pricing.currency"
								name="currency"
								rules="required"
								:placeholder="$t('dashboard.hotel.currency')"
								:items="[
									{ value: 'SAR', title: $t('dashboard.hotel.currency_sar') },
									{ value: 'USD', title: $t('dashboard.hotel.currency_usd') },
									{ value: 'EUR', title: $t('dashboard.hotel.currency_eur') },
								]"
								icon="mdi:currency-usd"
							/>
						</div>
					</section>

					<!-- Contact Information Section -->
					<section>
						<h3
							class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
						>
							<Icon name="mdi:phone" class="text-primary" />
							{{ $t("dashboard.hotel.contact_section") }}
						</h3>

						<div class="grid md:grid-cols-2 gap-6">
							<InputsPhone
								v-model="form.contact.phone"
								name="phone"
								:placeholder="$t('dashboard.hotel.phone')"
							/>
							<InputsEmail
								v-model="form.contact.email"
								name="email"
								:placeholder="$t('dashboard.hotel.email')"
							/>
							<InputsText
								v-model="form.contact.website"
								name="website"
								type="url"
								:placeholder="$t('dashboard.hotel.website')"
								icon="mdi:web"
							/>
							<InputsText
								v-model="form.contact.manager"
								name="manager"
								:placeholder="$t('dashboard.hotel.manager')"
								icon="mdi:account-tie"
							/>
						</div>
					</section>

					<!-- Hotel Image -->
					<div class="md:col-span-2">
						<InputsText
							:title="$t('dashboard.hotel.image')"
							v-model="form.img"
							name="img"
							type="url"
							:placeholder="$t('dashboard.hotel.image_placeholder')"
							icon="mdi:image"
						/>
					</div>

					<!-- Submit Button -->
					<InputsSubmit :text="$t('dashboard.hotel.create')" :isLoading="isLoading" />
				</Form>
			</template>
		</LazyLayoutDashboardContent>
	</div>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
import type { Hotel_DB_Schema } from "~/types/hotel";

// Form data
const form = reactive({
	name: {
		ar: "",
		en: "",
	},
	description: {
		ar: "",
		en: "",
	},
	content: {
		ar: "",
		en: "",
	},
	location: {
		city: {
			ar: "",
			en: "",
		},
	},
	address: {
		ar: "",
		en: "",
	},
	img: "",
	rate: 5,
	status: "active",
	amenities: {
		wifi: "no",
		parking: "no",
		pool: "no",
		gym: "no",
		restaurant: "no",
		spa: "no",
		room_service: "no",
		laundry: "no",
	},
	pricing: {
		min_price: "",
		max_price: "",
		currency: "SAR",
	},
	contact: {
		phone: "",
		email: "",
		website: "",
		manager: "",
	},
});

const isLoading = ref(false);

// Methods
const onSubmit = async (data: any) => {
	try {
		isLoading.value = true;

		// Prepare the data according to the Hotel_DB_Schema
		const hotelData: Hotel_DB_Schema = {
			name: form.name,
			description: form.description,
			location: form.location,
			img: form.img || "/logo/vertical.png",
			rate: form.rate,
		};

		// Call the API to create the hotel
		const response = await useApi().post("/hotels", hotelData);

		// Show success message
		useToast().success($t("dashboard.hotel.success_created"));

		// Redirect to hotels list
		await navigateTo("/dashboard/hotels");
	} catch (error: any) {
		console.error("Error creating hotel:", error);
		useToast().error(
			error?.response?.data?.message || error?.message || $t("dashboard.hotel.error_creating"),
		);
	} finally {
		isLoading.value = false;
	}
};

// SEO and metadata
usePageTitle("dashboard.hotel.add");
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});
</script>
