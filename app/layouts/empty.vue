dashboard
<template>
	<div
		class="empty bg-neutral-200 dark:!bg-stone-800 min-h-dvh h-full flex flex-col items-center justify-center"
	>
		<slot />
	</div>
</template>

<style scoped>
.empty::before {
	content: "";
	background-image: radial-gradient(circle at 50% 0px, rgb(195, 139, 255), transparent 50%);
	@apply aspect-square  fixed bottom-0 left-0 pointer-events-none inset-0 opacity-15;
}
</style>
