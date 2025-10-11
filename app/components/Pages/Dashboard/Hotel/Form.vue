<script setup lang="ts">
import type { IHotelRequest } from "~/types/hotel";
import { Form, Field } from "vee-validate";

const { locale, t: $t } = useI18n();
const toast = useToast();
const props = defineProps<{ isEdit?: boolean }>();
const route = useRoute();
const router = useRouter();

const { data: amenities, refresh: refreshAmenity } = useAmenity();
const cityDialogOpen = ref(false);

onMounted(() => {
	if (props.isEdit && id) getHotelData();
});

const id = route.params.id as string;

const isLoading = ref(false);
const isLoadingAmenity = ref(false);
const hotel = ref<IHotelRequest | undefined>();

const mainImage = ref();
const images = ref();

const getHotelData = () => {
	useApi()
		.get(`/hotels/${id}`, {
			params: {},
		})
		.then((res) => (hotel.value = res.data))
		.catch((error) => console.error(error));
};

// methods
const onSubmit = async (data: any) => {
	try {
		isLoading.value = true;

		if (mainImage.value.files.length) data.img = (await mainImage.value?.uploadFiles?.call())[0];

		if (images.value.files.length)
			data.images = [...data.images, ...(await images.value?.uploadFiles?.call())];

		let response = null;
		if (props.isEdit) {
			response = await useApi().patch(`/hotels/${route.params.id}`, data);
			toast.success($t("dashboard.hotel.success_updated"));
		} else {
			response = await useApi().post("/hotels", data);
			toast.success($t("dashboard.hotel.success_created"));
		}

		router.push("/dashboard/hotels");
	} catch (error: any) {
		console.error("Error", error);
	} finally {
		isLoading.value = false;
	}
};

const { refresh: refreshCities, cities, status: citiesStatus } = useCity();
const AddAmenity = async (data: any, { resetForm }: any) => {
	try {
		isLoadingAmenity.value = true;
		const response = await useApi().post("/amenity", data);
		toast.success($t("dashboard.hotel.success_created"));

		resetForm();
		refreshAmenity();
	} catch (error: any) {
		console.error("Error", error);
	} finally {
		isLoadingAmenity.value = false;
	}
};
const createCity = async (data: any) => {
	await useApi().post("/cities", data);
	refreshCities();
};
</script>

<template>
	<Form
		v-if="!id || hotel"
		v-bind="{ onSubmit }"
		:initial-values="hotel"
		v-slot="{ values }"
		:data-allow-mismatch="true"
		class="space-y-8"
	>
		<section>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
				<Icon name="mdi:information" />
				{{ $t("dashboard.hotel.basic_info") }}
			</h3>

			<div class="grid md:grid-cols-2 gap-6">
				<InputsText
					name="name.ar"
					rules="required"
					:placeholder="$t('dashboard.hotel.name.ar')"
					:title="$t('dashboard.hotel.name.ar')"
					icon="mdi:translate"
				/>

				<InputsText
					name="name.en"
					rules="required"
					:placeholder="$t('dashboard.hotel.name.en')"
					:title="$t('dashboard.hotel.name.en')"
					icon="mdi:translate"
				/>

				<InputsTextarea
					name="description.ar"
					rules="required"
					:placeholder="$t('dashboard.hotel.description_placeholder.ar')"
					:title="$t('dashboard.hotel.description.ar')"
					:rows="4"
				/>

				<InputsTextarea
					name="description.en"
					rules="required"
					:placeholder="$t('dashboard.hotel.description_placeholder.en')"
					:title="$t('dashboard.hotel.description.en')"
					:rows="4"
				/>
			</div>
		</section>

		<hr />

		<section class="grid md:grid-cols-3 gap-6">
			<InputsSelect
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
				:default-value="5"
				icon="mdi:star"
			/>

			<InputsSelect
				:title="$t('dashboard.hotel.status')"
				name="status"
				rules="required"
				:placeholder="$t('dashboard.hotel.status')"
				:items="[
					{ value: 'active', title: $t('dashboard.hotel.status_active') },
					{ value: 'inactive', title: $t('dashboard.hotel.status_inactive') },
				]"
				default-value="active"
				icon="mdi:check-circle"
			/>

			<InputsText
				:title="$t('dashboard.hotel.min_price')"
				name="price"
				type="number"
				rules="required"
				:placeholder="$t('dashboard.hotel.min_price')"
				icon="mdi:currency-usd"
			/>
		</section>

		<hr />

		<section>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
				<Icon name="mdi:map-marker" />
				{{ $t("dashboard.hotel.location_section") }}

				<GlobalFormDialog :title="$t('hotels.cities.add')" @submit="createCity">
					<template #btn="a">
						<button
							v-bind="a"
							type="button"
							class="rounded-full p-3 overflow-hidden after:absolute after:inset-6 hover:after:inset-0 after:transition-all relative after:backdrop-invert after:backdrop-hue-rotate-180 flex items-center hover:bg-slate-100/10"
						>
							<Icon name="mdi:plus" />
						</button>
					</template>

					<InputsText
						:title="$t('hotels.cities.name_ar')"
						name="ar"
						icon="mdi:city"
						rules="required"
					/>
					<InputsText
						:title="$t('hotels.cities.name_en')"
						name="en"
						icon="mdi:city"
						rules="required"
					/>
				</GlobalFormDialog>
			</h3>

			<InputsSelect
				name="location.city"
				rules="required"
				:title="$t('dashboard.hotel.city')"
				:items="
					(cities || []).map((c: any) => ({
						value: c._id,
						title: c[locale],
					}))
				"
				:status="citiesStatus"
				:placeholder="$t('dashboard.hotel.city_placeholder')"
				icon="mdi:city"
			/>
			<div class="grid md:grid-cols-2 gap-6">
				<InputsText
					name="location.address.ar"
					:placeholder="$t('dashboard.hotel.address.ar')"
					:title="$t('dashboard.hotel.address.ar')"
					icon="mdi:map-marker"
					rules="required"
				/>

				<InputsText
					name="location.address.en"
					:placeholder="$t('dashboard.hotel.address.en')"
					:title="$t('dashboard.hotel.address.en')"
					icon="mdi:map-marker"
					rules="required"
				/>
			</div>
		</section>

		<hr />

		<section>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
				<span>
					<Icon name="mdi:star-box" />
					{{ $t("dashboard.hotel.amenities_section") }}
				</span>

				<GlobalFormDialog :title="$t('dashboard.hotel.add_amenity')" @submit="AddAmenity">
					<template #btn="activatorProps">
						<button
							type="button"
							v-bind="activatorProps"
							class="rounded-full p-3 overflow-hidden after:absolute after:inset-6 hover:after:inset-0 after:transition-all relative after:backdrop-invert after:backdrop-hue-rotate-180 flex items-center hover:bg-slate-100/10"
						>
							<Icon name="mdi:plus" />
						</button>
					</template>

					<InputsText
						name="ar"
						rules="required"
						:placeholder="$t('dashboard.hotel.name.ar')"
						icon="ooui:bold-arab-dad"
					/>
					<InputsText
						name="en"
						rules="required"
						:placeholder="$t('dashboard.hotel.name.en')"
						icon="ri:english-input"
					/>
					<InputsText
						icon="line-md:iconify2"
						name="icon"
						rules="required"
						:placeholder="$t('global.icon')"
					/>
				</GlobalFormDialog>
			</h3>

			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				<template v-for="amenity in amenities" :key="amenity.id">
					<Field type="checkbox" name="amenities" v-slot="{ field, setValue }">
						<InputsCheckbox
							v-bind="field"
							:value="amenity.id"
							:id="amenity.id"
							:title="amenity[locale]"
						/>
					</Field>
				</template>
			</div>
		</section>

		<section>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
				<Icon name="mdi:image" />
				{{ $t("dashboard.hotel.images_section") }}
			</h3>

			<div class="grid md:grid-cols-2 gap-4">
				<InputsFile
					ref="mainImage"
					path="hotels"
					accept="image/*"
					name="img"
					:title="$t('dashboard.hotel.main_image')"
				/>
				<InputsFile
					ref="images"
					accept="image/*"
					path="hotels"
					multiple
					name="images"
					:title="$t('dashboard.hotel.additional_images')"
				/>
			</div>
		</section>
		<hr />

		<section class="flex flex-col gap-6">
			<InputsContentEditor
				name="content.ar"
				:placeholder="$t('dashboard.hotel.content.ar')"
				:title="$t('dashboard.hotel.content.ar')"
			/>
			<InputsContentEditor
				name="content.en"
				:placeholder="$t('dashboard.hotel.content.en')"
				:title="$t('dashboard.hotel.content.en')"
			/>
		</section>
		<InputsSubmit :isLoading="isLoading" />
	</Form>
</template>
