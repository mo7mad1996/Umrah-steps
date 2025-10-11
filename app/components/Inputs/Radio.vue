<template>
	<div
		class="radio-inputs flex relative flex-wrap gap-1 rounded-lg bg-purple-200 dark:!bg-purple-950 shadow-sm text-sm p-1"
	>
		<label class="radio flex-1 text-center" v-for="item in data">
			<input
				type="radio"
				v-model="model"
				:name="name"
				:value="item.value"
				:disabled="item.disabled"
			/>
			<span
				class="flex gap-2 cursor-pointer justify-center rounded-lg border-none p-2 select-none text-gray-600 transition-all duration-150 name"
				:class="{
					[activeClass || '']: model == item.value,
					[itemClass || '']: itemClass,
				}"
			>
				<Icon v-if="item.icon" :name="item.icon" /> {{ item.title }}
			</span>
		</label>
	</div>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		activeClass?: string;
		itemClass?: string;
		data: {
			value: any;
			disabled?: boolean;
			title?: string;
			icon?: string;
		}[];
		name: string;
	}>(),
	{
		activeClass: "dark:!text-white",
		itemClass: "dark:!bg-transparent !text-white/50",
	},
);

const model = defineModel();
</script>

<style scoped lang="scss">
/* From Uiverse.io by 00Kubi */
.radio-inputs {
	.radio {
		input {
			display: none;

			&:checked + .name {
				@apply bg-white relative;
				font-weight: 600;
				box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
				animation: select 0.3s ease;
			}
			&[disabled] + .name {
				color: #c6bdbd;
				cursor: not-allowed;
			}
		}

		&:hover .name {
			background-color: rgba(255, 255, 255, 0.5);
		}
	}
}

/* Animation */
@keyframes select {
	0% {
		transform: scale(0.95);
	}
	50% {
		transform: scale(1.05);
	}
	100% {
		transform: scale(1);
	}
}

/* Particles */
.radio-inputs .radio input:checked + .name::before,
.radio-inputs .radio input:checked + .name::after {
	content: "";
	@apply bg-primary opacity-0 h-1 w-1 absolute rounded-full;
	animation: particles 0.5s ease forwards;
}

.radio-inputs .radio input:checked + .name::before {
	top: -8px;
	left: 50%;
	transform: translateX(-50%);
}

.radio-inputs .radio input:checked + .name::after {
	bottom: -8px;
	left: 50%;
	transform: translateX(-50%);
}

@keyframes particles {
	0% {
		opacity: 0;
		transform: translateX(-50%) translateY(0);
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0;
		transform: translateX(-50%) translateY(var(--direction));
	}
}

.radio-inputs .radio input:checked + .name::before {
	--direction: -10px;
}

.radio-inputs .radio input:checked + .name::after {
	--direction: 10px;
}
</style>
