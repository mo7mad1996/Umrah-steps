<template>
	<div
		class="flex flex-col gap-2 relative"
		@drop.prevent="handleDrop"
		@dragover.prevent="isDragging = true"
		@dragleave.prevent="isDragging = false"
	>
		<!-- files -->
		<div
			class="gap-2 flex flex-wrap w-full bg-neutral-100 dark:!bg-gray-800/50 p-2 rounded-lg"
			:class="{
				'justify-center': !multiple,
			}"
			v-if="[field.value.value, files].flat().filter((f) => !!f).length"
		>
			<div
				@click.prevent
				v-for="(preview, index) in files"
				:key="index"
				class="flex gap-2 p-2 shadow-lg bg-white dark:!bg-white/30 rounded-lg flex-col relative z-10"
			>
				<div class="flex-shrink-0 rounded flex flex-col items-center justify-center">
					<img
						:src="preview.content?.toString()"
						class="h-32 w-32 rounded aspect-square object-cover block"
					/>
				</div>

				<div class="flex flex-1 w-full">
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium truncate max-w-28 text-blue-500 dark:text-blue-700">
							{{ preview.name }}
						</p>
					</div>
					<button @click="files.splice(index, 1)" type="button" :aria-label="`حذف ${preview}`">
						<Icon name="material-symbols:scan-delete" class="text-md" />
					</button>
				</div>
			</div>
			<div
				@click.prevent
				v-for="(preview, index) in [field.value.value].flat().filter((f) => !!f)"
				:key="index"
				class="flex gap-2 p-2 shadow-lg bg-white dark:!bg-white/30 rounded-lg flex-col relative z-10"
			>
				<div class="flex-shrink-0 rounded flex flex-col items-center justify-center">
					<img :src="`${preview}`" class="h-32 w-32 rounded aspect-square object-cover block" />
				</div>

				<div class="flex flex-1 w-full">
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium truncate max-w-28 text-blue-500 dark:text-blue-700">
							{{ preview }}
						</p>
					</div>
					<button
						@click="() => removeFile(`${preview}`)"
						type="button"
						:aria-label="`حذف ${preview}`"
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
import { ErrorMessage, useField } from "vee-validate";
const inputRef = ref<HTMLInputElement>();
interface Props {
	title?: string;
	name?: string;
	rules?: string;
	accept?: string;
	multiple?: boolean;
	path?: string;
}

const props = withDefaults(defineProps<Props>(), {
	rules: "",
	name: "files",
	accept: "",
	multiple: false,
});
const { handleFileInput, files } = useFileStorage({
	clearOldFiles: !props.multiple,
});

const isDragging = ref(false);
const field = useField(props.name, props.rules);

const removeFile = async (file: string) => {
	const newArr = [field.value.value].flat().filter((f) => f !== file);
	field.value.value = props.multiple ? newArr : newArr[0] || "";
	await useApi().delete("files", { params: { file } });
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

const uploadFiles = async (): Promise<any> => {
	return await $fetch("/api/files?path=" + props.path, {
		method: "POST",
		body: {
			files: files.value,
		},
	});
};

defineExpose({ files, uploadFiles });
defineOptions({ inheritAttrs: false });
</script>
