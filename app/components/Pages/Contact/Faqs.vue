<template>
	<section class="mb-16">
		<!-- title -->
		<div class="text-center mb-12" v-if="status == 'success'">
			<h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
				{{ $t("contact.faq.title") }}
			</h2>
			<p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
				{{ $t("contact.faq.description") }}
			</p>
		</div>

		<!-- section -->
		<div class="mx-auto space-y-4" v-if="status == 'success'">
			<div
				v-for="(faq, index) in faqs"
				:key="index"
				class="shadow bg-neutral-50 dark:bg-neutral-800"
			>
				<label
					class="w-full cursor-pointer px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
				>
					<div class="flex items-start gap-3">
						<Icon name="lucide:circle-question-mark" class="text-secondary text-3xl" />
						<div class="font-medium text-gray-800 dark:text-white">
							{{ faq.question }}
						</div>
					</div>
					<Icon
						name="mdi:chevron-down"
						class="text-primary transition-transform duration-300 text-xl"
						:class="{ 'rotate-180': open == index }"
					/>

					<input
						type="radio"
						:value="index != open ? index : -1"
						class="hidden"
						v-model="open"
						name="faq"
					/>
				</label>

				<Transition name="fade" mode="out-in">
					<div v-if="open == index" class="flex gap-1 p-6 items-start bg-white/10">
						<Icon name="lucide:info" class="text-success text-3xl" />
						<p class="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed relative">
							{{ faq.answer }}
						</p>
					</div>
				</Transition>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const open = ref(-1);
const { locale } = useI18n();

const { data: faqs, status } = useAsyncData(
	"faq",
	() =>
		useApi()
			.get("/faqs")
			.then((d) => d.data),
	{ watch: [locale] },
);
</script>

<style scoped lang="scss">
.fade-leave-active,
.fade-enter-active {
	transition: all 0.3s ease-out;
	height: 100%;
}

.fade-enter-from,
.fade-leave-to {
	transform: translateY(-20px);
	height: 0;
	opacity: 0;
}
</style>
