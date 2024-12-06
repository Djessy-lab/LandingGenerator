// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-lucide-icons",
    "@nuxt/icon",
    '@sidebase/nuxt-auth'
  ],
  auth: {
    secret: process.env.AUTH_SECRET,
    origin: process.env.AUTH_ORIGIN,
    enableGlobalAppMiddleware: true,
  },
  runtimeConfig: {
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    authSecret: process.env.AUTH_SECRET,
    public: {
URL,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    },
    private: {
      postgresUrl: process.env.POSTGRES_URL,
    },
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            amsterdam: ["New Amsterdam", "sans-serif"],
            prompt: ["Prompt", "sans-serif"],
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
  alias: {
    "@": "./",
  },
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=New+Amsterdam&display=swap",
        },
      ],
    },
  },
});
