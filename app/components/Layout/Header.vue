<template>
  <div class="fixed w-full z-50">
    <header
      class="container ltr:bg-gradient-to-tr backdrop-blur-sm rtl:bg-gradient-to-tl from-goldContrast dark:from-goldContrast-dark to-primary/80 mx-auto dark:to-primary-dark my-4 p-2 rounded-lg shadow-xl transition-colors duration-300"
    >
      <div
        class="flex gap-5 items-stretch justify-between ltr:flex-row-reverse"
      >
        <NuxtLink to="/" class="block">
          <NuxtImg
            src="/logo/horizontal.png"
            height="60"
            :alt="$t('site_name')"
          />
        </NuxtLink>

        <nav class="-my-2">
          <ul class="flex mx-auto w-fit h-full">
            <li v-for="(link, n) in links" :key="n">
              <NuxtLink
                :to="link.to"
                :title="link.title"
                exactActiveClass="!text-yellow-300  after:w-full font-bold "
                class="text-white px-4 flex flex-col gap-1 items-center justify-center py-1 h-full hover:!text-yellow-300 after:w-0 after:h-1 after:bg-yellow-300 after:block after:absolute relative after:bottom-0 after:rounded-t-full after:transition-all after:duration-0-300"
              >
                {{ $t(link.title) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <v-btn-group
          variant="plain"
          class="text-white has-[ul]:!overflow-x-visible has-[ul]:!overflow-y-visible !h-auto ltr:flex-row-reverse"
        >
          <v-btn @click="dark = !!((+dark + 1) % 2)">
            <transition name="dark">
              <Icon
                class="text-2xl"
                name="line-md:sunny-filled-loop-to-moon-filled-alt-loop-transition"
                v-if="dark"
              ></Icon>
              <Icon
                class="text-2xl"
                name="line-md:moon-filled-to-sunny-filled-transition"
                v-else
              ></Icon>
            </transition>
          </v-btn>
          <InputsSelect
            @update="changeLang"
            v-model="locale"
            :items="
              locales.map((locale) => ({
                title: locale.name,
                value: locale.code,
              }))
            "
            class="relative"
            menuClass="top-full !bg-goldContrast dark:!bg-goldContrast-dark text-white py-1 min-w-32"
            customClass="!bg-transparent !rounded-none text-white "
            itemClass="group-hover:!bg-white/20 !text-white"
            activeClass="!bg-harmony1/10 rounded text-blue-400 after:w-2 after:aspect-square after:bg-harmony1  after:block after:rounded flex items-center gap-2 justify-between"
          >
            <template #activator="props">
              <v-btn v-bind="props" class="!h-full relative">
                <Icon name="lucide:languages" class="text-2xl"></Icon>
              </v-btn>
            </template>
          </InputsSelect>
        </v-btn-group>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
const { locales, setLocale, locale: l } = useI18n();
const links = [
  { to: "/", title: "nav.home" },
  { to: "/hotels", title: "nav.hotels" },
  { to: "/about", title: "nav.about" },
  { to: "/contact", title: "nav.contact" },
];

const locale = ref(l.value);
const changeLang = ({ value }: any) => setLocale(value);

const dark = useCookie("dark", {
  default: () => false,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 356), // 1 year
});
</script>

<style>
.dark-enter-active,
.dark-leave-active {
  transition: 0.5s ease !important;
  @apply h-full absolute;
}

.dark-enter-from {
  transform: translateY(-100%) !important;
}
.dark-leave-to {
  transform: translateY(100%) !important;
}
</style>
