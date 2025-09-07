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
            {{ $t("contact.title") }}
          </h1>
          <h2 class="text-h5 opacity-90">
            {{ $t("contact.subtitle") }}
          </h2>
        </div>
      </v-container>
    </section>

    <!-- Contact Content -->
    <section class="section-padding">
      <v-container>
        <v-row>
          <!-- Contact Form -->
          <v-col cols="12" md="8">
            <v-card class="pa-8" elevation="4">
              <h3
                class="text-h4 font-weight-bold text-primary mb-6"
                style="font-family: 'Cairo', sans-serif"
              >
                أرسل لنا رسالة
              </h3>

              <v-form @submit.prevent="submitForm" ref="contactForm">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.name"
                      :label="$t('contact.form.name')"
                      variant="outlined"
                      :rules="[rules.required]"
                      prepend-inner-icon="mdi:account"
                      required
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.email"
                      :label="$t('contact.form.email')"
                      variant="outlined"
                      :rules="[rules.required, rules.email]"
                      prepend-inner-icon="mdi:email"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.phone"
                      :label="$t('contact.form.phone')"
                      variant="outlined"
                      :rules="[rules.required]"
                      prepend-inner-icon="mdi:phone"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="form.message"
                      :label="$t('contact.form.message')"
                      variant="outlined"
                      :rules="[rules.required]"
                      prepend-inner-icon="mdi:message"
                      rows="5"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      type="submit"
                      color="primary"
                      size="large"
                      :loading="loading"
                      class="px-8"
                    >
                      <v-icon name="mdi:send" class="me-2" />
                      {{ $t("contact.form.send") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-col>

          <!-- Contact Information -->
          <v-col cols="12" md="4">
            <v-card class="pa-6 mb-6" elevation="4">
              <h3
                class="text-h5 font-weight-bold text-primary mb-6"
                style="font-family: 'Cairo', sans-serif"
              >
                معلومات التواصل
              </h3>

              <div class="mb-6">
                <div class="d-flex align-center mb-3">
                  <v-icon
                    name="mdi:map-marker"
                    class="text-primary me-3"
                    size="24"
                  />
                  <div>
                    <h4 class="font-weight-bold">
                      {{ $t("contact.info.address") }}
                    </h4>
                    <p class="text-grey-darken-1 mb-0">
                      المملكة العربية السعودية<br />مكة المكرمة - حي العزيزية
                    </p>
                  </div>
                </div>
              </div>

              <div class="mb-6">
                <div class="d-flex align-center mb-3">
                  <v-icon
                    name="mdi:phone"
                    class="text-primary me-3"
                    size="24"
                  />
                  <div>
                    <h4 class="font-weight-bold">
                      {{ $t("contact.info.phone") }}
                    </h4>
                    <p class="text-grey-darken-1 mb-0" dir="ltr">
                      +966 12 345 6789
                    </p>
                    <p class="text-grey-darken-1 mb-0" dir="ltr">
                      +966 55 123 4567
                    </p>
                  </div>
                </div>
              </div>

              <div class="mb-6">
                <div class="d-flex align-center mb-3">
                  <v-icon
                    name="mdi:email"
                    class="text-primary me-3"
                    size="24"
                  />
                  <div>
                    <h4 class="font-weight-bold">
                      {{ $t("contact.info.email") }}
                    </h4>
                    <p class="text-grey-darken-1 mb-0">
                      info@khatwat-almutamir.com
                    </p>
                    <p class="text-grey-darken-1 mb-0">
                      support@khatwat-almutamir.com
                    </p>
                  </div>
                </div>
              </div>

              <div class="mb-6">
                <div class="d-flex align-center mb-3">
                  <v-icon
                    name="mdi:clock"
                    class="text-primary me-3"
                    size="24"
                  />
                  <div>
                    <h4 class="font-weight-bold">
                      {{ $t("contact.info.hours") }}
                    </h4>
                    <p class="text-grey-darken-1 mb-0">
                      السبت - الخميس: 8:00 ص - 10:00 م
                    </p>
                    <p class="text-grey-darken-1 mb-0">
                      الجمعة: 2:00 م - 10:00 م
                    </p>
                  </div>
                </div>
              </div>
            </v-card>

            <!-- Social Links -->
            <v-card class="pa-6" elevation="4">
              <h3
                class="text-h6 font-weight-bold text-primary mb-4"
                style="font-family: 'Cairo', sans-serif"
              >
                تابعونا على
              </h3>
              <div class="d-flex justify-space-around">
                <v-btn icon color="primary" variant="outlined">
                  <v-icon name="mdi:whatsapp" />
                </v-btn>
                <v-btn icon color="primary" variant="outlined">
                  <v-icon name="mdi:facebook" />
                </v-btn>
                <v-btn icon color="primary" variant="outlined">
                  <v-icon name="mdi:twitter" />
                </v-btn>
                <v-btn icon color="primary" variant="outlined">
                  <v-icon name="mdi:instagram" />
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Map Section -->
    <section class="py-0">
      <div id="contact-map" style="height: 400px; width: 100%"></div>
    </section>
  </div>
</template>

<script setup>
// const { initMap, addMarker } = useGoogleMaps();

const form = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const loading = ref(false);
const contactForm = ref();

const rules = {
  required: (value) => !!value || "هذا الحقل مطلوب",
  email: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || "البريد الإلكتروني غير صحيح";
  },
};

const submitForm = async () => {
  const { valid } = await contactForm.value.validate();
  if (!valid) return;

  loading.value = true;

  try {
    // محاكاة إرسال الرسالة
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    form.value = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    // Show success message
    $toast.success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً");
  } catch (error) {
    $toast.error("حدث خطأ في إرسال الرسالة. حاول مرة أخرى");
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  // Initialize contact map
  // const makkahCenter = { lat: 21.4225, lng: 39.8262 };
  // const map = await initMap("contact-map", makkahCenter, 13);
  // if (map) {
  //   addMarker(map, makkahCenter, "حجوزات المعتمر - مكة المكرمة");
  // }
});

// SEO
useHead({
  title: "اتصل بنا",
  meta: [
    {
      name: "description",
      content: "تواصل مع فريق حجوزات المعتمر للاستفسار عن خدمات الحج والعمرة",
    },
  ],
});
</script>
