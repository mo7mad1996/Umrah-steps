<template>
	<div class="hint text-center p-5 ltr">{{ $t("global.loading") }}...</div>
</template>

<style scoped>
.hint {
	animation: shine 2s linear infinite;
	background: linear-gradient(70deg, #7b7b7bc0 30%, #7b7b7b21, #7b7b7bc0 70%);

	@apply text-black/15 dark:text-white/10;
	background-size: auto;
	background-clip: border-box;
	background-clip: text;
	-webkit-background-clip: text;
	background-size: 200% 200%;
	font-size: 22px;
	font-weight: 700;
	letter-spacing: 0.4px;
	width: fit-content;
	margin: 1em auto;
	background-position-x: 200%;
}

@keyframes shine {
	to {
		background-position-x: -200%;
	}
}
</style>
