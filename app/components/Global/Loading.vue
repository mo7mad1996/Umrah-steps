<template>
	<div class="hint">Loading...</div>
</template>

<style scoped>
.hint {
	font-size: 22px;
	font-weight: bold;
	color: transparent;

	background: linear-gradient(110deg, #92999e 20%, #ffffff 40%, #92999e 60%);
	background-size: 200% 100%;
	background-clip: text;
	-webkit-background-clip: text;
	animation: shine 2.2s linear infinite;
	letter-spacing: 0.4px;
}

@keyframes shine {
	to {
		background-position-x: -200%;
	}
}
</style>
