<template>
	<div
		class="w-full relative bg-neutral-100 dark:!bg-indigo-950 rounded-2xl px-4 md:px-6 py-4 shadow"
	>
		<Form>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-end">
				<InputsSelect
					name="location.city"
					rules="required"
					icon="bi:flag-fill"
					:title="$t('dashboard.destination')"
					:items="
					(cities || []).map((c: any) => ({
						value: c._id,
						title: c[locale],
					}))
				"
					:status="citiesStatus"
					:placeholder="$t('dashboard.hotel.city_placeholder')"
				/>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
					<InputsText
						:title="$t('dashboard.number_of_rooms')"
						inputmode="numeric"
						type="number"
						name="number_of_rooms"
						:placeholder="$t('dashboard.number_of_rooms')"
						icon="mdi-bed"
					/>
					<InputsText
						inputmode="numeric"
						type="number"
						:title="$t('dashboard.number_of_people')"
						name="number_of_people"
						:placeholder="$t('dashboard.number_of_people')"
						icon="mdi-account"
					/>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:col-span-2 lg:col-span-1 md:gap-4">
					<InputsDate
						:title="$t('dashboard.arrival_date')"
						name="dashboard.arrival_date"
						format="yyyy-MM-dd"
					/>
					<InputsDate
						:title="$t('dashboard.return_date')"
						name="dashboard.return_date"
						format="yyyy-MM-dd"
					/>
				</div>

				<InputsSubmit class="pt-2 md:pt-4 col-span-1" :text="$t('global.search')" />
			</div>
		</Form>
	</div>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
const { locale } = useI18n();
const { refresh: refreshCities, cities, status: citiesStatus } = useCity();
</script>
