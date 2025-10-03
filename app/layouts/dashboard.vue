<template>
	<div class="relative h-dvh w-dvw box-border bg-gray-200 dark:bg-stone-900 overflow-hidden">
		<div class="flex h-full w-full mb-2" ref="PerfectScroll">
			<!-- Sidebar (Large Screens) -->
			<div class="sticky top-0 md:p-2">
				<LayoutDashboardSidebar />
			</div>

			<!-- Main Content -->
			<section class="flex-1 flex flex-col">
				<slot />
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
const PerfectScroll = ref<HTMLElement>();

const { $initPerfectScrollbar }: any = useNuxtApp();
watch(
	PerfectScroll,
	(v) => {
		if (v) $initPerfectScrollbar(v);
	},
	{ immediate: true },
);
</script>
