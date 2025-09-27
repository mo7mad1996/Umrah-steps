<template>
	<div class="flex justify-between items-center mb-4 md:mb-8 p-2 gap-4 md:p-4">
		<div>
			<h1 class="md:text-2xl font-bold">{{ title || subTitle }}</h1>
			<h1 class="opacity-60 text-sm" v-if="subTitle && title">
				{{ subTitle }}
			</h1>
		</div>

		<div class="flex gap-2" v-if="buttons.length">
			<slot />

			<component
				v-for="(btn, n) in props.buttons"
				:is="btn.tag ? btn.tag : btn.hasOwnProperty('to') ? NuxtLink : 'button'"
				class="rounded-md bg-indigo-600 cursor-pointer px-5 py-2 flex md:gap-3 items-center justify-center hover:bg-indigo-500 text-white shadow"
				:key="n"
				@click="btn.action?.call()"
				:to="btn.to"
				:target="btn.target"
			>
				<Icon v-if="btn.icon" :name="btn.icon" class="block" />
				<span class="max-md:hidden block">
					{{ btn.text }}
				</span>
			</component>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { NuxtLink } from "#components";

const props: any = defineProps({
	title: {
		type: String,
		default: "",
		required: false,
	},
	subTitle: {
		type: String,
		default: "",
		required: false,
	},
	buttons: {
		type: Array,
		default: [],
		required: false,
	},
});
</script>
