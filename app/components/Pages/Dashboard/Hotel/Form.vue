<script setup lang="ts">
import type { IHotelRequest } from "~/types/hotel";
import { Form } from "vee-validate";
const { locale } = useI18n();
const props = defineProps<{
	isEdit?: boolean;
}>();

const route = useRoute();
const router = useRouter();

// Form data
const form = reactive<IHotelRequest>({
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
		address: {
			ar: "",
			en: "",
		},
	},
	img: "/logo/vertical.png",
	rate: 5,
	status: "active",
	amenities: [],
	price: 0,
});
const isLoading = ref(false);
const isLoadingAmenity = ref(false);

const onSubmit = async (data: IHotelRequest) => {
	try {
		isLoading.value = true;

		let response = null;
		if (props.isEdit) {
			response = await useApi().patch(`/hotels/route.params.id`, data);
			useToast().success($t("dashboard.hotel.success_updated"));
		} else {
			response = await useApi().post("/hotels", data);
			useToast().success($t("dashboard.hotel.success_created"));
		}

		// Redirect to hotels list
		router.push("/dashboard/hotels/" + response.data.id);
	} catch (error: any) {
		console.error("Error", error);
		useToast().error(
			error?.response?.data?.message || error?.message || $t("dashboard.hotel.error"),
		);
	} finally {
		isLoading.value = false;
	}
};

const AddAmenity = async (data: any, { resetForm }: any) => {
	try {
		isLoadingAmenity.value = true;
		const response = await useApi().post("/amenity", data);
		useToast().success($t("dashboard.hotel.success_created"));
		resetForm();

		console.log(response);
		refreshAmenity();
	} catch (error: any) {
		console.error("Error", error);
		useToast().error(
			error?.response?.data?.message || error?.message || $t("dashboard.hotel.error"),
		);
	} finally {
		isLoadingAmenity.value = false;
	}
};

const { data: amenities, refresh: refreshAmenity } = useAmenity();
</script>

<template>
	<Form @submit="(data) => onSubmit(data as IHotelRequest)" class="space-y-8">
		<section>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
				<Icon name="mdi:information" />
				{{ $t("dashboard.hotel.basic_info") }}
			</h3>

			<div class="grid md:grid-cols-2 gap-6">
				<InputsText
					v-model="form.name.ar"
					name="name_ar"
					rules="required"
					:placeholder="$t('dashboard.hotel.name.ar')"
					:title="$t('dashboard.hotel.name.ar')"
					icon="mdi:translate"
				/>

				<InputsText
					v-model="form.name.en"
					name="name_en"
					rules="required"
					:placeholder="$t('dashboard.hotel.name.en')"
					:title="$t('dashboard.hotel.name.en')"
					icon="mdi:translate"
				/>

				<InputsTextarea
					v-model="form.description.ar"
					name="description_ar"
					rules="required"
					:placeholder="$t('dashboard.hotel.description_placeholder.ar')"
					:title="$t('dashboard.hotel.description.ar')"
					:rows="4"
				/>

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

		<section>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
				<Icon name="mdi:map-marker" />
				{{ $t("dashboard.hotel.location_section") }}
			</h3>

			<div class="grid md:grid-cols-2 gap-6">
				<InputsText
					v-model="form.location.city.ar"
					name="location.city.ar"
					rules="required"
					:placeholder="$t('dashboard.hotel.city.ar')"
					icon="mdi:city"
				/>

				<InputsText
					v-model="form.location.city.en"
					name="location.city.en"
					rules="required"
					:placeholder="$t('dashboard.hotel.city.en')"
					icon="mdi:city"
				/>

				<!-- Address  -->
				<InputsText
					v-model="form.location.address.ar"
					name="location.address.ar"
					:placeholder="$t('dashboard.hotel.address.ar')"
					icon="mdi:map-marker"
				/>

				<InputsText
					v-model="form.location.address.en"
					name="location.address.en"
					:placeholder="$t('dashboard.hotel.address.en')"
					icon="mdi:map-marker"
				/>
			</div>
		</section>

		<section>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
				<Icon name="mdi:star-box" />
				{{ $t("dashboard.hotel.amenities_section") }}

				<v-dialog max-width="500">
					<template v-slot:activator="{ props: activatorProps }">
						<button
							v-bind="activatorProps"
							class="bg-primary dark:bg-primary-dark text-white rounded shadow-lg px-3 hover:brightness-90 flex items-center py-2"
						>
							<Icon name="mdi:plus" />
						</button>
					</template>

					<template #default="{ isActive }">
						<section class="p-1">
							<Form v-bind="{ onSubmit: AddAmenity }">
								<div
									class="bg-white dark:!bg-gray-800 p-4 shadow-xl rounded-2xl flex flex-col gap-4"
								>
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

									<hr />
									<div class="flex justify-end gap-2 items-stretch">
										<button
											@click.prevent.stop="isActive.value = false"
											class="flex items-center justify-center text-red-500 rounded border px-4 hover:bg-red-100 !border-red-500 bg-red-100/40"
										>
											{{ $t("global.cancel") }}
										</button>
										<InputsSubmit :isLoading="isLoadingAmenity" class="!w-fit !mt-0">
											{{ $t("global.save") }}
										</InputsSubmit>
									</div>
								</div>
							</Form>
						</section>
					</template>
				</v-dialog>
			</h3>

			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				<InputsCheckbox
					v-for="amenity in amenities"
					:key="amenity.id"
					v-model="form.amenities"
					:value="amenity.id"
					name="amenities"
					:title="amenity[locale]"
				/>
			</div>
		</section>

		<section>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
				<Icon name="mdi:currency-usd" class="text-primary" />
				{{ $t("dashboard.hotel.pricing_section") }}
			</h3>

			<div class="grid md:grid-cols-3 gap-6">
				<InputsText
					v-model="form.price"
					name="price"
					type="number"
					rules="required"
					:placeholder="$t('dashboard.hotel.min_price')"
					icon="mdi:currency-usd"
				/>
			</div>
		</section>

		<div class="md:col-span-2">
			<InputsText
				:title="$t('dashboard.hotel.image')"
				v-model="form.img"
				name="img"
				type="url"
				:placeholder="$t('dashboard.hotel.image_placeholder')"
				icon="mdi:image"
			/>

			<!-- <InputsFile /> -->
		</div>

		<InputsContentEditor v-model="form.content.ar" name="content.ar" />
		<InputsContentEditor v-model="form.content.en" name="content.en" />
		<InputsSubmit :text="$t('dashboard.hotel.create')" :isLoading="isLoading" />
	</Form>
</template>
