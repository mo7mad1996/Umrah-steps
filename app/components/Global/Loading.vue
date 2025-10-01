<template>
	<div class="hint text-center p-5 ltr">{{ $t("global.loading") }}...</div>
</template>

<style scoped>
.hint {
	animation: shine 4s linear infinite;
	background: linear-gradient(110deg, #92999e 20%, #fff, #92999e 60%);
	background-size: auto;
	background-clip: border-box;
	background-clip: text;
	-webkit-background-clip: text;
	background-size: 400% 100%;
	color: transparent;
	font-size: 22px;
	font-weight: 700;
	letter-spacing: 0.4px;
	width: fit-content;
	margin: 1em auto;
}

@keyframes shine {
	to {
		background-position-x: -400%;
	}
}
</style>
