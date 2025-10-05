<template>
	<div
		class="flex flex-col gap-2 relative"
		@drop.prevent="handleDrop"
		@dragover.prevent="isDragging = true"
		@dragleave.prevent="isDragging = false"
	>
		<!-- files -->
		<div
			v-if="files.length"
			class="gap-2 flex flex-wrap w-full bg-neutral-100 dark:!bg-gray-800/50 p-2 rounded-lg"
			:class="{
				'justify-center': !multiple,
			}"
		>
			<div
				@click.prevent
				v-for="(preview, index) in files"
				:key="index"
				class="flex gap-2 p-2 shadow-lg bg-white dark:!bg-white/30 rounded-lg flex-col relative z-10"
			>
				<div class="flex-shrink-0 rounded flex flex-col items-center justify-center">
					<img
						v-if="preview.type.split('/')[0] === 'image'"
						:alt="preview.name"
						:src="preview.content"
						class="h-32 w-32 rounded aspect-square object-cover block"
					/>
					<Icon
						v-else
						:name="'bi:filetype-' + preview.type.split('/')[1]"
						class="w-16 h-16 object-cover text-gray-100 dark:text-gray-400"
					/>
				</div>

				<div class="flex flex-1 w-full">
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium truncate max-w-28 text-blue-500 dark:text-blue-700">
							{{ preview.name }}
						</p>
						<p class="text-xs opacity-40 max-w-28">{{ formatFileSize(preview.size) }}</p>
					</div>
					<button
						@click="removeFile(index)"
						type="button"
						class=""
						:aria-label="`حذف ${preview.name}`"
					>
						<Icon name="material-symbols:scan-delete" class="text-md" />
					</button>
				</div>
			</div>
		</div>

		<div
			:class="[
				' border-2 border-dashed rounded-lg transition-all duration-200',
				isDragging
					? 'border-blue-500 bg-blue-50  dark:bg-blue-100/10'
					: field.error
					? 'border-red-400'
					: 'border-gray-300 hover:border-gray-400 bg-gray-50 dark:bg-white/10 dark:!border-gray-500',
			]"
		>
			<label class="flex flex-col items-center justify-center py-12 px-6 cursor-pointer group">
				<input
					ref="inputRef"
					type="file"
					:name="name"
					:accept="accept"
					:multiple="multiple"
					@change="handleFileInput"
					class="opacity-0 absolute inset-0 z-0"
					v-bind="$attrs"
				/>
				<Icon name="line-md:uploading-loop" class="w-12 h-12 mb-4 text-gray-400" />
				<p class="mb-2 text-sm text-gray-600 font-medium" v-if="title">
					{{ title }}
				</p>
			</label>
		</div>
		<ErrorMessage :name="name" />
	</div>
</template>

<script setup lang="ts">
import { ErrorMessage, useFieldArray } from "vee-validate";
const inputRef = ref<HTMLInputElement>();
interface Props {
	title?: string;
	name?: string;
	rules?: string;
	accept?: string;
	multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	title: undefined,
	name: undefined,
	rules: "",
	accept: "",
	multiple: false,
});
const { locale } = useI18n();
const { handleFileInput, files } = useFileStorage({
	clearOldFiles: !props.multiple,
});

const isDragging = ref(false);

const field = useFieldArray(props.name || "file");
const modelValue = defineModel<string[] | null>();

const removeFile = (index: number) => {
	files.value.splice(index, 1);
};

const handleDrop = (event: DragEvent) => {
	isDragging.value = false;

	const droppedFiles = event.dataTransfer?.files;
	if (!droppedFiles || droppedFiles.length === 0) return;

	const fileArray: File[] = [];
	Array.from(droppedFiles).forEach((file) => {
		if (props.accept) {
			const acceptedTypes = props.accept.split(",").map((t) => t.trim());
			const matches = acceptedTypes.some((type) => {
				if (type.startsWith(".")) return file.name.toLowerCase().endsWith(type.toLowerCase());
				if (type.endsWith("/*")) {
					const category = type.split("/")[0] as string;
					return file.type.startsWith(category);
				}
				return file.type === type;
			});

			if (matches) fileArray.push(file);
			else
				useToast().error(
					` من فضلك اختر نوع الملف المطلوب ${file.name} - ${file.type} [ ${props.accept}]`,
				);
		}
	});

	if (fileArray.length === 0) return;

	handleFileInput({
		target: { files: props.multiple ? fileArray : [fileArray[0]] },
	});
};

const formatFileSize = (bytes: number = 0): string => {
	if (bytes === 0) return "0 Bytes";

	return new Intl.NumberFormat(`${locale.value}-EG`, {
		style: "unit",
		unit: "megabyte",
		maximumSignificantDigits: 2,
	}).format(bytes / 1024);
};

defineExpose({ files: () => files.value });
defineOptions({ inheritAttrs: false });
</script>
