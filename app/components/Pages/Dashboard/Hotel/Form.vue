<script setup lang="ts">
import type { IHotelRequest, IHotelResponseWithMultiLang } from "~/types/hotel";
import { Form } from "vee-validate";
const { locale, t: $t } = useI18n();
const toast = useToast();
const props = defineProps<{
	isEdit?: boolean;
	initialData?: IHotelResponseWithMultiLang;
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
	images: [],
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
			response = await useApi().patch(`/hotels/${route.params.id}`, data);
			toast.success($t("dashboard.hotel.success_updated"));
		} else {
			response = await useApi().post("/hotels", data);
			toast.success($t("dashboard.hotel.success_created"));
		}

		router.push("/dashboard/hotels");
	} catch (error: any) {
		console.error("Error", error);
		toast.error(
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
		toast.success($t("dashboard.hotel.success_created"));
		resetForm();

		console.log(response);
		refreshAmenity();
	} catch (error: any) {
		console.error("Error", error);
		toast.error(
			error?.response?.data?.message || error?.message || $t("dashboard.hotel.error"),
		);
	} finally {
		isLoadingAmenity.value = false;
	}
};

const { data: amenities, refresh: refreshAmenity } = useAmenity();

const mainImageFile = ref<File | null>(null);
const additionalImagesFiles = ref<File[]>([]);
const imageUrls = ref<string[]>([]);

const handleMainImageUpload = (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (target.files && target.files[0]) {
		mainImageFile.value = target.files[0];
		form.img = URL.createObjectURL(target.files[0]);
	}
};

const handleAdditionalImagesUpload = (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (target.files) {
		additionalImagesFiles.value = Array.from(target.files);
		imageUrls.value = Array.from(target.files).map((file) => URL.createObjectURL(file));
		form.images = imageUrls.value;
	}
};

const removeAdditionalImage = (index: number) => {
	imageUrls.value.splice(index, 1);
	additionalImagesFiles.value.splice(index, 1);
	form.images = imageUrls.value;
};

onMounted(() => {
	if (props.isEdit && props.initialData) {
		Object.assign(form, {
			name: props.initialData.name,
			description: props.initialData.description,
			content: props.initialData.content,
			location: props.initialData.location,
			img: props.initialData.img,
			images: props.initialData.images || [],
			rate: props.initialData.rate,
			status: props.initialData.status,
			amenities: props.initialData.amenities.map((a: any) => a.id || a),
			price: props.initialData.price,
		});

		if (props.initialData.images && props.initialData.images.length > 0) {
			imageUrls.value = [...props.initialData.images];
		}
	}
});
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

		<section>
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
				<Icon name="mdi:image" />
				{{ $t("dashboard.hotel.images_section") }}
			</h3>

			<div class="space-y-6">
				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						{{ $t("dashboard.hotel.main_image") }}
					</label>
					<div class="flex items-center gap-4">
						<div
							v-if="form.img"
							class="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700"
						>
							<NuxtImg :src="form.img" alt="Main Image" class="w-full h-full object-cover" />
						</div>
						<div class="flex-1">
							<input
								type="file"
								accept="image/*"
								@change="handleMainImageUpload"
								class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300"
							/>
							<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
								{{ $t("dashboard.hotel.image_hint") }}
							</p>
						</div>
					</div>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						{{ $t("dashboard.hotel.additional_images") }}
					</label>
					<input
						type="file"
						accept="image/*"
						multiple
						@change="handleAdditionalImagesUpload"
						class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300"
					/>
					<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
						{{ $t("dashboard.hotel.multiple_images_hint") }}
					</p>

					<div v-if="imageUrls.length > 0" class="grid grid-cols-4 gap-4 mt-4">
						<div
							v-for="(url, index) in imageUrls"
							:key="index"
							class="relative group rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 aspect-square"
						>
							<NuxtImg :src="url" alt="Additional Image" class="w-full h-full object-cover" />
							<button
								@click="removeAdditionalImage(index)"
								type="button"
								class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<Icon name="mdi:close" class="text-xl" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<InputsContentEditor v-model="form.content.ar" name="content.ar" />
		<InputsContentEditor v-model="form.content.en" name="content.en" />
		<InputsSubmit :text="$t('dashboard.hotel.create')" :isLoading="isLoading" />
	</Form>
</template>
