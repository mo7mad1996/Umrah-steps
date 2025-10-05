<script setup lang="ts">
import type { IHotelRequest } from "~/types/hotel";
import { Form } from "vee-validate";
const { locale, t: $t } = useI18n();
const toast = useToast();
const props = defineProps<{ isEdit?: boolean }>();

const route = useRoute();
const router = useRouter();
const { data: amenities, refresh: refreshAmenity } = useAmenity();

const id = route.params.id as string;

const isLoading = ref(false);
const isLoadingAmenity = ref(false);
const mainImageRef = ref<any>();
const imagesRef = ref<any>();

const { data: hotel, status } = useAsyncData(id, () =>
	id
		? useApi()
				.get(`/hotels/${id}`)
				.then(({ data }) => data)
		: Promise.reject(undefined),
);

// methods
const uploadImages = async (files: any): Promise<string[]> => {
	return await useApi().post("files", { files });
};

const onSubmit = async (data: IHotelRequest) => {
	try {
		isLoading.value = true;

		const img = (await uploadImages(mainImageRef.value?.files()))[0] || data.img;
		const images = await uploadImages(imagesRef.value?.files());

		data.img = img;
		data.images?.concat(...images);

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
		toast.error(error?.response?.data?.message || error?.message || $t("dashboard.hotel.error"));
	} finally {
		isLoading.value = false;
	}
};

const AddAmenity = async (data: any, { resetForm }: any) => {
	try {
		isLoadingAmenity.value = true;
		const response = await useApi().post("/amenity", data);
		toast.success($t("dashboard.hotel.success_created"));
		resetForm();

		console.log(response);
		refreshAmenity();
	} catch (error: any) {
		console.error("Error", error);
		toast.error(error?.response?.data?.message || error?.message || $t("dashboard.hotel.error"));
	} finally {
		isLoadingAmenity.value = false;
	}
};
</script>

<template>
	<Form
		@submit="(data: IHotelRequest) => onSubmit(data )"
		:initial-values="hotel"
		:data-allow-mismatch="true"
		v-slot="{ initialValues }"
		class="space-y-8"
	>
		<div class="flex">
			<pre>{{ status }}</pre>
			<pre>{{ initialValues }}</pre>
		</div>
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
		<div class="grid md:grid-cols-3 gap-6">
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
		</div>
		<hr />

		<section>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
				<Icon name="mdi:map-marker" />
				{{ $t("dashboard.hotel.location_section") }}
			</h3>

			<div class="grid md:grid-cols-2 gap-6">
				<InputsText
					name="location.city.ar"
					rules="required"
					:placeholder="$t('dashboard.hotel.city.ar')"
					icon="mdi:city"
				/>

				<InputsText
					name="location.city.en"
					rules="required"
					:placeholder="$t('dashboard.hotel.city.en')"
					icon="mdi:city"
				/>

				<InputsText
					name="location.address.ar"
					:placeholder="$t('dashboard.hotel.address.ar')"
					icon="mdi:map-marker"
					rules="required"
				/>

				<InputsText
					name="location.address.en"
					:placeholder="$t('dashboard.hotel.address.en')"
					icon="mdi:map-marker"
					rules="required"
				/>
			</div>
		</section>
		<hr />

		<section>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
				<Icon name="mdi:star-box" />
				{{ $t("dashboard.hotel.amenities_section") }}

				<v-dialog attach max-width="500">
					<template v-slot:activator="{ props: activatorProps }">
						<button
							v-bind="activatorProps"
							class="rounded-full p-3 overflow-hidden after:absolute after:inset-6 hover:after:inset-0 after:transition-all relative after:backdrop-invert after:backdrop-hue-rotate-180 flex items-center hover:bg-slate-100/10"
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
									<h3 class="text-xl py-5 font-semibold text-inherit dark:text-white/40">
										{{ $t("dashboard.hotel.add_amenity") }}
									</h3>
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
											class="flex items-center justify-center text-red-600 rounded px-6 shadow bg-red-100 dark:bg-red-100/5 hover:bg-red-100 bg-red-100/40"
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
					:value="amenity.id"
					:name="amenity.id"
					:title="amenity[locale]"
				/>
			</div>
		</section>

		<section>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
				<Icon name="mdi:image" />
				{{ $t("dashboard.hotel.images_section") }}
			</h3>

			<div class="grid md:grid-cols-2 gap-4">
				<InputsFile
					ref="mainImageRef"
					accept="image/*"
					name="img"
					:title="$t('dashboard.hotel.main_image')"
				/>
				<InputsFile
					ref="imagesRef"
					accept="image/*"
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
