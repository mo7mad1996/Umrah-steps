<template>
  <div>
    <LayoutDashboardPageTitle :title="$t('dashboard.site_settings')" />

    <v-card class="mt-4">
      <v-tabs v-model="activeTab" class="border-b dark:border-gray-700">
        <v-tab value="home">
          <Icon name="mdi:home" class="me-2" />
          {{ $t('nav.home') }}
        </v-tab>
        <v-tab value="hotels">
          <Icon name="mdi:hotel" class="me-2" />
          {{ $t('nav.hotels') }}
        </v-tab>
        <v-tab value="about">
          <Icon name="mdi:information" class="me-2" />
          {{ $t('nav.about') }}
        </v-tab>
        <v-tab value="contact">
          <Icon name="mdi:email" class="me-2" />
          {{ $t('nav.contact') }}
        </v-tab>
      </v-tabs>

      <v-card-text class="pa-6">
        <v-window v-model="activeTab">
          <v-window-item value="home">
            <PagesDashboardPageContentForm page="home" />
          </v-window-item>
          <v-window-item value="hotels">
            <PagesDashboardPageContentForm page="hotels" />
          </v-window-item>
          <v-window-item value="about">
            <PagesDashboardPageContentForm page="about" />
          </v-window-item>
          <v-window-item value="contact">
            <PagesDashboardPageContentForm page="contact" />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
usePageTitle('dashboard.site_settings');
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const activeTab = ref('home');
</script>
