<template>
  <div>
    <!-- Page Header -->
    <section class="gradient-bg text-white py-24">
      <v-container>
        <div class="text-center">
          <h1
            class="text-h2 font-weight-bold mb-4"
            style="font-family: 'Cairo', sans-serif"
          >
            {{ $t("about.title") }}
          </h1>
          <h2 class="text-h5 opacity-90">
            {{ $t("about.subtitle") }}
          </h2>
        </div>
      </v-container>
    </section>

    <!-- About Content -->
    <section class="section-padding">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <div class="pe-md-8">
              <h3
                class="text-h4 font-weight-bold text-primary mb-6"
                style="font-family: 'Cairo', sans-serif"
              >
                من نحن؟
              </h3>
              <p class="text-h6 mb-6 line-height-relaxed">
                {{ $t("about.description") }}
              </p>
              <p class="text-body-1 text-grey-darken-1 mb-8">
                نحن نؤمن بأن خدمة ضيوف الرحمن شرف عظيم، ولذلك نسعى دائماً لتقديم
                أفضل ما لدينا من خدمات وتسهيلات لجعل رحلة الحج والعمرة تجربة
                روحانية مميزة ومريحة.
              </p>

              <div class="d-flex align-center mb-4">
                <v-icon
                  name="mdi:check-circle"
                  class="text-primary me-3"
                  size="24"
                />
                <span class="font-weight-medium"
                  >خبرة أكثر من 15 سنة في خدمة الحجاج</span
                >
              </div>
              <div class="d-flex align-center mb-4">
                <v-icon
                  name="mdi:check-circle"
                  class="text-primary me-3"
                  size="24"
                />
                <span class="font-weight-medium"
                  >فريق متخصص ومدرب على أعلى مستوى</span
                >
              </div>
              <div class="d-flex align-center mb-4">
                <v-icon
                  name="mdi:check-circle"
                  class="text-primary me-3"
                  size="24"
                />
                <span class="font-weight-medium"
                  >خدمة عملاء متاحة على مدار الساعة</span
                >
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <v-img
              src="https://images.pexels.com/photos/8142959/pexels-photo-8142959.jpeg"
              alt="خدمات الحج والعمرة"
              class="rounded-lg card-hover"
              cover
              height="400"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Mission & Vision -->
    <section class="bg-grey-lighten-5 section-padding">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="pa-8 h-100 card-hover" elevation="4">
              <div class="text-center mb-6">
                <v-icon name="mdi:target" size="64" class="text-primary" />
              </div>
              <h3
                class="text-h5 font-weight-bold text-center text-primary mb-4"
                style="font-family: 'Cairo', sans-serif"
              >
                {{ $t("about.mission.title") }}
              </h3>
              <p class="text-body-1 text-center text-grey-darken-1">
                {{ $t("about.mission.text") }}
              </p>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card class="pa-8 h-100 card-hover" elevation="4">
              <div class="text-center mb-6">
                <v-icon name="mdi:eye" size="64" class="text-primary" />
              </div>
              <h3
                class="text-h5 font-weight-bold text-center text-primary mb-4"
                style="font-family: 'Cairo', sans-serif"
              >
                {{ $t("about.vision.title") }}
              </h3>
              <p class="text-body-1 text-center text-grey-darken-1">
                {{ $t("about.vision.text") }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Stats Section -->
    <section class="gradient-bg text-white section-padding">
      <v-container>
        <v-row>
          <v-col
            cols="6"
            md="3"
            v-for="stat in stats"
            :key="stat.label"
            class="text-center"
          >
            <div class="mb-4">
              <v-icon :name="stat.icon" size="48" class="text-secondary" />
            </div>
            <h3 class="text-h3 font-weight-bold mb-2">{{ stat.value }}</h3>
            <p class="text-body-1 opacity-90">{{ stat.label }}</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
const stats = [
  { icon: "mdi:account-group", value: "50K+", label: "عميل راضي" },
  { icon: "mdi:hotel", value: "200+", label: "فندق شريك" },
  { icon: "mdi:car-multiple", value: "500+", label: "مركبة متاحة" },
  { icon: "mdi:star", value: "4.9", label: "تقييم العملاء" },
];

// SEO
useHead({
  title: "من نحن - خطوات المعتمر",
  meta: [
    {
      name: "description",
      content: "تعرف على خطوات المعتمر، الشركة الرائدة في خدمات الحج والعمرة",
    },
  ],
});
</script>

<style scoped>
.line-height-relaxed {
  line-height: 1.8;
}
</style>
