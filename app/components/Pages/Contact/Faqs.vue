<template>
  <section class="mb-16">
    <!-- title -->
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {{ $t("contact.faq.title") }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {{ $t("contact.faq.description") }}
      </p>
    </div>

    <!-- section -->
    <div class="mx-auto space-y-4">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="shadow bg-neutral-50 dark:bg-neutral-800"
      >
        <label
          class="w-full cursor-pointer px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div class="flex items-start gap-3">
            <Icon
              name="lucide:circle-question-mark"
              class="text-secondary text-3xl"
            />
            <div class="font-medium text-gray-800 dark:text-white">
              {{ faq.question }}
            </div>
          </div>
          <Icon
            name="mdi:chevron-down"
            class="text-primary transition-transform duration-300 text-xl"
            :class="{ 'rotate-180': open == index }"
          />

          <input
            type="radio"
            :value="index != open ? index : -1"
            class="hidden"
            v-model="open"
            name="faq"
          />
        </label>

        <Transition name="fade" mode="out-in">
          <div
            v-if="open == index"
            class="flex gap-1 p-6 items-start bg-white/10"
          >
            <Icon name="lucide:info" class="text-success text-3xl" />
            <p
              class="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed relative"
            >
              {{ faq.answer }}
            </p>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const open = ref(-1);

// FAQ data
const faqs = [
  {
    question: "كيف يمكنني حجز فندق؟",
    answer:
      "يمكنك حجز الفندق من خلال موقعنا الإلكتروني أو الاتصال بنا مباشرة. سيقوم فريقنا بمساعدتك في اختيار أفضل الخيارات المتاحة.",
  },
  {
    question: "هل تقدمون خدمات النقل؟",
    answer:
      "نعم، نقدم خدمات النقل من وإلى المطار والحرمين الشريفين بمركبات مكيفة ومريحة.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer:
      "نقبل جميع طرق الدفع الرئيسية بما في ذلك البطاقات الائتمانية والتحويل البنكي والدفع النقدي.",
  },
  {
    question: "هل يمكنني إلغاء الحجز؟",
    answer:
      "نعم، يمكنك إلغاء الحجز وفقاً لسياسة الإلغاء الخاصة بكل فندق. يرجى مراجعة الشروط والأحكام.",
  },
  {
    question: "هل تقدمون دعم على مدار الساعة؟",
    answer:
      "نعم، نقدم دعم العملاء على مدار الساعة طوال أيام الأسبوع لضمان راحتكم.",
  },
];
</script>

<style scoped lang="scss">
.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s ease-out;
  height: 100%;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-20px);
  height: 0;
  opacity: 0;
}
</style>
