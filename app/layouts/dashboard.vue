<template>
	<div class="relative h-dvh p-2 bg-gray-200">
		<div class="flex h-full static">
			<!-- Sidebar (Large Screens) -->
			<div class="sticky top-0 p-2">
				<LayoutDashboardSidebar />
			</div>

			<!-- Main Content -->
			<section class="flex-1">
				<slot />
			</section>
		</div>
	</div>
</template>
