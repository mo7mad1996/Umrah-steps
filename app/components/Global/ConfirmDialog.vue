<template>
	<v-dialog v-model="dialog" max-width="500" attach>
		<template v-slot:activator="{ props }">
			<slot v-bind="props" />
		</template>

		<div
			class="p-6 py-2 rounded-xl bg-white dark:!bg-neutral-900/70 backdrop-blur-lg text-black dark:!text-white/80"
		>
			<h1 class="font-bold text-3xl flex items-center gap-5 py-3">
				<Icon :name="icon" />

				<span>
					{{ title }}
				</span>
			</h1>

			<p
				v-if="content"
				class="opacity-60 p-4 text-sm border !border-transparent !border-s-8 my-3 bg-primary/10 !border-s-primary"
			>
				{{ content }}
			</p>
			<hr />
			<div @click.prevent.stop class="flex gap-3 p-3">
				<v-spacer />

				<InputsBtn
					no-svg
					:loading="loadingCancel"
					:text="$t('global.cancel')"
					@click="handleConfirm"
					class="hover:!bg-green-200/20 !bg-green-100 hover:border !text-green-800 hover:underline"
				/>

				<InputsBtn
					:loading="loading"
					:text="$t('global.confirm')"
					@click="handleConfirm"
					class="!text-red-600 hover:!bg-red-400/50 !bg-red-300"
				/>
			</div>
		</div>
	</v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(["confirm", "cancel"]);

const dialog = ref(false);
const loading = ref(false);
const loadingCancel = ref(false);

const props = withDefaults(
	defineProps<{
		title: string;
		content?: string;
		icon?: string;
	}>(),
	{
		icon: "i-heroicons-exclamation-triangle",
	},
);

const handleConfirm = () => {
	try {
		loading.value = true;

		emit("confirm");
		dialog.value = false;
	} catch (err) {
		console.error(err);
	} finally {
		loading.value = false;
	}
};

const handleCancel = () => {
	try {
		loadingCancel.value = true;
		emit("cancel");
		dialog.value = false;
	} catch (err) {
		console.error(err);
	} finally {
		loadingCancel.value = false;
	}
};
</script>
