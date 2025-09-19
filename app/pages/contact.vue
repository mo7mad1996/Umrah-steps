<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-zinc-950">
    <!-- Background Image -->
    <GlobalImageMask src="/images/hotel.jpg" />

    <!-- Page Header -->
    <GlobalPageTitle
      :title="$t('contact.title')"
      :subTitle="$t('contact.subtitle')"
    />

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-16">
      <!-- Contact Methods -->
      <section class="mb-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {{ $t('contact.methods.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {{ $t('contact.methods.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Phone -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Icon name="mdi:phone" class="text-primary text-2xl" />
            </div>
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
              {{ $t('contact.info.phone') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">اتصل بنا مباشرة</p>
            <a href="tel:+966123456789" class="text-primary hover:text-primary/80 font-medium" dir="ltr">
              +966 12 345 6789
            </a>
          </div>

          <!-- WhatsApp -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
            <div class="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Icon name="mdi:whatsapp" class="text-green-500 text-2xl" />
            </div>
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">واتساب</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">تواصل سريع ومباشر</p>
            <a href="https://wa.me/966551234567" class="text-green-500 hover:text-green-500/80 font-medium" dir="ltr">
              +966 55 123 4567
            </a>
          </div>

          <!-- Email -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
            <div class="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Icon name="mdi:email" class="text-blue-500 text-2xl" />
            </div>
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
              {{ $t('contact.info.email') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">راسلنا إلكترونياً</p>
            <a href="mailto:info@khatwat-almutamir.com" class="text-blue-500 hover:text-blue-500/80 font-medium text-sm">
              info@khatwat-almutamir.com
            </a>
          </div>

          <!-- Location -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
            <div class="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Icon name="mdi:map-marker" class="text-red-500 text-2xl" />
            </div>
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">
              {{ $t('contact.info.address') }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">زورنا في مكتبنا</p>
            <p class="text-red-500 font-medium text-sm">مكة المكرمة - العزيزية</p>
          </div>
        </div>
      </section>

      <!-- Contact Form & Info -->
      <section class="mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
              <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {{ $t('contact.form.title') }}
              </h3>

              <Form @submit="submitForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputsText
                    v-model="form.name"
                    name="name"
                    rules="required"
                    :placeholder="$t('contact.form.name')"
                    icon="mdi:account"
                  />
                  <InputsEmail
                    v-model="form.email"
                    name="email"
                    rules="required|email"
                    :placeholder="$t('contact.form.email')"
                  />
                </div>

                <InputsPhone
                  v-model="form.phone"
                  name="phone"
                  rules="required"
                  :placeholder="$t('contact.form.phone')"
                />

                <InputsSelect
                  v-model="form.subject"
                  name="subject"
                  rules="required"
                  :placeholder="$t('contact.form.subject')"
                  :items="[
                    { value: 'booking', title: 'استفسار عن حجز' },
                    { value: 'complaint', title: 'شكوى' },
                    { value: 'suggestion', title: 'اقتراح' },
                    { value: 'other', title: 'أخرى' }
                  ]"
                  icon="mdi:format-list-bulleted"
                />

                <InputsTextarea
                  v-model="form.message"
                  name="message"
                  rules="required"
                  :placeholder="$t('contact.form.message')"
                  :rows="5"
                />

                <InputsSubmit 
                  :text="$t('contact.form.send')" 
                  :isLoading="loading"
                />
              </Form>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="space-y-6">
            <!-- Office Hours -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                <Icon name="mdi:clock" class="text-primary" />
                {{ $t('contact.info.hours') }}
              </h3>
              <div class="space-y-3 text-gray-600 dark:text-gray-400">
                <div class="flex justify-between">
                  <span>السبت - الخميس</span>
                  <span>8:00 ص - 10:00 م</span>
                </div>
                <div class="flex justify-between">
                  <span>الجمعة</span>
                  <span>2:00 م - 10:00 م</span>
                </div>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {{ $t('contact.quick_links.title') }}
              </h3>
              <div class="space-y-3">
                <NuxtLink 
                  to="/hotels" 
                  class="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <Icon name="ri:hotel-bed-fill" />
                  {{ $t('nav.hotels') }}
                </NuxtLink>
                <NuxtLink 
                  to="/about" 
                  class="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <Icon name="mdi:information" />
                  {{ $t('nav.about') }}
                </NuxtLink>
                <a 
                  href="tel:+966123456789" 
                  class="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <Icon name="mdi:phone" />
                  اتصال طارئ
                </a>
              </div>
            </div>

            <!-- Social Media -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {{ $t('contact.social.title') }}
              </h3>
              <div class="flex gap-3">
                <a 
                  href="#" 
                  class="w-12 h-12 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon name="mdi:whatsapp" class="text-xl" />
                </a>
                <a 
                  href="#" 
                  class="w-12 h-12 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon name="mdi:facebook" class="text-xl" />
                </a>
                <a 
                  href="#" 
                  class="w-12 h-12 bg-sky-500/10 hover:bg-sky-500 text-sky-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon name="mdi:twitter" class="text-xl" />
                </a>
                <a 
                  href="#" 
                  class="w-12 h-12 bg-pink-500/10 hover:bg-pink-500 text-pink-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon name="mdi:instagram" class="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="mb-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {{ $t('contact.faq.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {{ $t('contact.faq.description') }}
          </p>
        </div>

        <div class="max-w-4xl mx-auto space-y-4">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="font-medium text-gray-800 dark:text-white">{{ faq.question }}</span>
              <Icon 
                name="mdi:chevron-down" 
                class="text-primary transition-transform duration-300"
                :class="{ 'rotate-180': faq.isOpen }"
              />
            </button>
            <div 
              v-show="faq.isOpen"
              class="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>

      <!-- Map Section -->
      <section>
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            {{ $t('contact.map.title') }}
          </h2>
          <div class="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96 flex items-center justify-center">
            <div class="text-center text-gray-500 dark:text-gray-400">
              <Icon name="mdi:map" class="text-6xl mb-4" />
              <p>{{ $t('contact.map.placeholder') }}</p>
              <p class="text-sm mt-2">مكة المكرمة - حي العزيزية</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form } from "vee-validate"

// Form data
const form = ref({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
})

const loading = ref(false)

// FAQ data
const faqs = ref([
  {
    question: "كيف يمكنني حجز فندق؟",
    answer: "يمكنك حجز الفندق من خلال موقعنا الإلكتروني أو الاتصال بنا مباشرة. سيقوم فريقنا بمساعدتك في اختيار أفضل الخيارات المتاحة.",
    isOpen: false
  },
  {
    question: "هل تقدمون خدمات النقل؟",
    answer: "نعم، نقدم خدمات النقل من وإلى المطار والحرمين الشريفين بمركبات مكيفة ومريحة.",
    isOpen: false
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نقبل جميع طرق الدفع الرئيسية بما في ذلك البطاقات الائتمانية والتحويل البنكي والدفع النقدي.",
    isOpen: false
  },
  {
    question: "هل يمكنني إلغاء الحجز؟",
    answer: "نعم، يمكنك إلغاء الحجز وفقاً لسياسة الإلغاء الخاصة بكل فندق. يرجى مراجعة الشروط والأحكام.",
    isOpen: false
  },
  {
    question: "هل تقدمون دعم على مدار الساعة؟",
    answer: "نعم، نقدم دعم العملاء على مدار الساعة طوال أيام الأسبوع لضمان راحتكم.",
    isOpen: false
  }
])

// Methods
const submitForm = async () => {
  loading.value = true

  try {
    // محاكاة إرسال الرسالة
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    form.value = {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    }

    // Show success message
    useToast().success("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً")
  } catch (error) {
    useToast().error("حدث خطأ في إرسال الرسالة. حاول مرة أخرى")
  } finally {
    loading.value = false
  }
}

const toggleFaq = (index: number) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}

// SEO
usePageTitle("contact.title")

useHead({
  meta: [
    {
      name: "description",
      content: "تواصل مع حجوزات المعتمر للحصول على أفضل خدمات الحج والعمرة. نحن هنا لخدمتكم على مدار الساعة"
    },
    {
      name: "keywords",
      content: "اتصل بنا, حجوزات المعتمر, خدمة العملاء, الحج, العمرة, مكة المكرمة"
    }
  ]
})
</script>