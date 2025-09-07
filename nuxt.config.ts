// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  vite: {
    mode: "development",
  },
  css: ["~/assets/css/main.css"],

  components: [
    { path: "~/components" },
    { path: "~/components/Global", prefix: "Global" },
  ],

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "vuetify-nuxt-module",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "nuxt-tiptap-editor",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],

  // modules
  i18n: {
    locales: [
      { code: "ar", file: "ar.json", dir: "rtl", name: "العربية" },
      { code: "en", file: "en.json", dir: "ltr", name: "English" },
    ],
    strategy: "no_prefix",
    autoDeclare: true,
    langDir: "lang",
    defaultLocale: "ar",
  },

  vuetify: {
    vuetifyOptions: {
      theme: {
        themes: {
          light: {
            colors: {
              primary: "#10B981",
              secondary: "#F59E0B",
              accent: "#1E40AF",
              error: "#EF4444",
              warning: "#F59E0B",
              info: "#3B82F6",
              success: "#10B981",
            },
          },
        },
      },
    },
  },

  // application
  app: {
    head: {
      meta: [
        {
          name: "description",
          content:
            "موقع خطوات المعتمر يقدم خدمات التوصيل وحجز الفنادق للحجاج والمعتمرين",
        },
        {
          name: "google-site-verification",
          content: "luNweKGQ9McJMXvwDKrRjTYa1MM3t6NQfqNq7FpMsGI",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
});
