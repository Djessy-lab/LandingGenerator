// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-lucide-icons",
    "@nuxt/icon",
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            amsterdam: ["New Amsterdam", "sans-serif"],
          },
          boxShadow: {
            custom:
              "6.8px 3.6px 3.6px rgba(0, 0, 0, 0.031), " +
              "18.9px 9.9px 10px rgba(0, 0, 0, 0.045), " +
              "45.5px 23.8px 24.1px rgba(0, 0, 0, 0.059), " +
              "151px 79px 80px rgba(0, 0, 0, 0.09)",
          },
        },
      },
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=New+Amsterdam&display=swap",
        },
      ],
    },
  },
});
