<template>
	<div class="min-h-dvh p-2 md:p-4 flex flex-col">
		<div class="relative flex-1 flex flex-col" v-if="'success' == PageContentStatus">
			<div
				class="absolute inset-0 overflow-hidden rounded-3xl after:bg-black/30 after:absolute after:inset-0 after:z-0 h-full"
			>
				<NuxtImg
					alt="hotel"
					:src="pageContent.content.image || `/images/hotel2.jpeg`"
					class="block w-full h-full object-cover"
				/>
			</div>

			<div class="hero-content p-4 md:p-6 relative z-10 flex-1 w-full flex flex-col gap-12">
				<div class="flex-1 flex justify-center items-center flex-col text-white max-md:pt-28">
					<h1 class="text-2xl md:text-4xl lg:text-5xl my-4 md:my-6 font-bold text-center px-4">
						{{ pageContent.content.heading[locale] }}
					</h1>
					<p class="opacity-70 text-sm md:text-base lg:text-lg text-center max-w-2xl px-4">
						{{ pageContent.content.subheading[locale] }}
					</p>
				</div>

				<GlobalHotelsFormSearch />
			</div>
		</div>
		<GlobalLoading v-else />
	</div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
const { data: pageContent, status: PageContentStatus } = useAsyncData("pageContent-about", () =>
	useApi()
		.get("/page-content/home")
		.then((d) => d.data),
);
</script>
