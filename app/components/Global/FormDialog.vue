<template>
	<v-dialog attach max-width="500" ref="dialog" v-model="opened">
		<template v-slot:activator="{ props }">
			<slot v-bind="props" name="btn" />
		</template>

		<template #default="{ isActive }">
			<section class="p-1">
				<Form v-bind="{ onSubmit }">
					<div class="bg-white dark:!bg-gray-800 p-4 shadow-xl rounded-2xl flex flex-col gap-4">
						<h3
							class="text-xl py-5 font-semibold text-inherit dark:text-white/40 flex justify-between align-center"
						>
							{{ title }}

							<button @click.stop="opened = false"><Icon name="tabler-x" /></button>
						</h3>

						<!-- body -->
						<slot />

						<hr />
						<div class="flex justify-end gap-2 items-stretch">
							<InputsBtn
								no-svg
								@click.prevent.stop="isActive.value = false"
								class="flex items-center justify-center !text-red-600 rounded px-6 shadow !bg-red-100 dark:!bg-red-400/20 hover:!bg-red-100 !bg-red-500/40"
								:text="$t('global.cancel')"
							/>
							<InputsBtn :loading="isLoading" :text="$t('global.save')" type="submit" />
						</div>
					</div>
				</Form>
			</section>
		</template>
	</v-dialog>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";

const opened = ref(false);
interface Props {
	title?: string;
}
const dialog = ref<any>();
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(["submit"]);
const isLoading = ref(false);

const onSubmit = async (...attr: any[]) => {
	try {
		isLoading.value = true;
		emit("submit", ...attr);
		console.log(dialog.value.animateClick());

		attr[1].resetForm();
		opened.value = false;
	} finally {
		isLoading.value = false;
	}
};
</script>
