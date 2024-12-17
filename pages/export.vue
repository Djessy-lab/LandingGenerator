<template>
  <div class="bg-neutral-100 h-screen">
    <h1 class="text-2xl font-semibold text-center py-4">Exporter la configuration</h1>
    <div class="flex justify-center">
      <Button @click="exportConfig">Exporter</Button>
    </div>
    <div class="w-[70%] h-[35rem] bg-white rounded-lg shadow-lg mx-auto mt-10">
      <iframe ref="previewIframe" :src="previewUrl" class="w-full h-full" frameborder="0"
        sandbox="allow-same-origin allow-scripts"></iframe>
    </div>
  </div>
</template>

<script>
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { fetchComponentContent } from '@/utils/fetchComponentContent';

export default {
  name: "Export",
  data() {
    return {
      config: null,
      previewUrl: '',
      userId: null,
    };
  },
  async mounted() {
    const config = sessionStorage.getItem("exportConfig");
    if (config) {
      this.config = JSON.parse(config);
      sessionStorage.removeItem("exportConfig");
      this.userId = this.$route.query.userId;
      this.previewUrl = this.generatePreviewUrl();
    } else {
      this.$router.push('/')
    }
    this.$nextTick(() => {
      const iframe = this.$refs.previewIframe;
      iframe.onload = () => {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.addEventListener('click', this.preventNavigation);
      };
    });
  },
  beforeDestroy() {
    const iframe = this.$refs.previewIframe;
    if (iframe) {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      iframeDocument.removeEventListener('click', this.preventNavigation);
    }
  },
  methods: {
    async exportConfig() {
      const zip = new JSZip();
      const folder = zip.folder(this.config.configName);
      const componentsFolder = folder.folder("components");
      const landingFolder = componentsFolder.folder("Landing");

      const pageContent = this.generatePageContent();
      landingFolder.file("Page.vue", pageContent);

      const appContent = this.generateAppContent();
      folder.file("app.vue", appContent);

      const pagesFolder = folder.folder("pages");
      const indexContent = this.generateIndexContent();
      pagesFolder.file("index.vue", indexContent);

      const packageJsonContent = this.generatePackageJson();
      folder.file("package.json", packageJsonContent);

      const nuxtConfigContent = this.generateNuxtConfig();
      folder.file("nuxt.config.ts", nuxtConfigContent);

      const components = await this.getLandingComponents();
      components.forEach(component => {
        landingFolder.file(component.name, component.content);
      });

      const publicFolder = folder.folder("public");
      const imgFolder = publicFolder.folder("img");
      imgFolder.file("stars.png", await this.getStarsImage());

      const content = await zip.generateAsync({ type: "blob" });
      FileSaver.saveAs(content, `${this.config.configName}.zip`);
    },
    generatePageContent() {
      return `<template>
  <div>
    <LandingHeroSection
      :imgHero="imgHero"
      :title="titleHero"
      :description="descriptionHero"
      :imgHeroShadow="imgHeroShadow"
      :imgHeroRounded="imgHeroRounded"
      :imgHeroPosition="imgHeroPosition"
      :imgHeroFit="imgHeroFit"
      :imgHeroWidth="imgHeroWidth"
      :imgHeroHeight="imgHeroHeight"
      :color="color"
      :appName="appName"
    />
    <LandingAdvantages
      :color="color"
      :advantages="advantages"
      :appName="appName"
    />
    <LandingHowItsWorks
      :imgArg="imgArg"
      :imgArgShadow="imgArgShadow"
      :imgArgRounded="imgArgRounded"
      :imgArgPosition="imgArgPosition"
      :imgArgFit="imgArgFit"
      :imgArgWidth="imgArgWidth"
      :imgArgHeight="imgArgHeight"
    />
    <LandingPricing
      :color="color"
      :pricing="pricing"
    />
    <LandingTestimonials
      :testimonials="testimonials"
    />
    <LandingGetEmail
      :color="color"
    />
  </div>
</template>

<script>
export default {
  name: "Page",
  data() {
    return {
      titleHero: ${JSON.stringify(this.config.titleHero)},
      descriptionHero: ${JSON.stringify(this.config.descriptionHero)},
      color: ${JSON.stringify(this.config.color)},
      imgHero: ${JSON.stringify(this.config.imgHero)},
      imgArg: ${JSON.stringify(this.config.imgArg)},
      imgHeroShadow: ${this.config.imgHeroShadow},
      imgHeroRounded: ${this.config.imgHeroRounded},
      imgArgShadow: ${this.config.imgArgShadow},
      imgArgRounded: ${this.config.imgArgRounded},
      imgHeroPosition: ${JSON.stringify(this.config.imgHeroPosition)},
      imgHeroFit: ${JSON.stringify(this.config.imgHeroFit)},
      imgHeroWidth: ${JSON.stringify(this.config.imgHeroWidth)},
      imgHeroHeight: ${JSON.stringify(this.config.imgHeroHeight)},
      imgArgPosition: ${JSON.stringify(this.config.imgArgPosition)},
      imgArgFit: ${JSON.stringify(this.config.imgArgFit)},
      imgArgWidth: ${JSON.stringify(this.config.imgArgWidth)},
      imgArgHeight: ${JSON.stringify(this.config.imgArgHeight)},
      advantages: ${JSON.stringify(this.config.advantages)},
      testimonials: ${JSON.stringify(this.config.testimonials)},
      pricing: ${JSON.stringify(this.config.pricing)},
      appName: ${JSON.stringify(this.config.appName)},
    };
  },
};
<\/script>`;
    },
    generateAppContent() {
      return `<template>
  <div class="dark:bg-gray-900 dark:text-white min-h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
`;
    },
    generateIndexContent() {
      return `<template>
  <LandingPage />
</template>

<script>
<\/script>
`;
    },
    generatePackageJson() {
      return JSON.stringify({
        name: this.config.configName,
        private: true,
        type: "module",
        scripts: {
          build: "nuxt build",
          dev: "nuxt dev",
          generate: "nuxt generate",
          preview: "nuxt preview",
          postinstall: "nuxt prepare"
        },
        dependencies: {
          "@nuxt/icon": "^1.5.0",
          "@nuxtjs/color-mode": "^3.4.2",
          "dayjs": "^1.11.13",
          "dotenv": "^16.4.5",
          "file-saver": "^2.0.5",
          "jsonwebtoken": "^9.0.2",
          "nodemailer": "^6.9.14",
          "nuxt": "^3.12.4",
          "nuxt-lucide-icons": "^1.0.5",
          "tailwindcss": "^3.4.16",
          "vue": "latest",
        },
        devDependencies: {
          "@nuxtjs/tailwindcss": "^6.12.2",
          "@types/jsonwebtoken": "^9.0.7"
        }
      }, null, 2);
    },
    generateNuxtConfig() {
      return `import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-lucide-icons",
    "@nuxt/icon",
  ],
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
});`;
    },
    async getLandingComponents() {
      const componentNames = [
        'HeroSection.vue',
        'Advantages.vue',
        'HowItsWorks.vue',
        'Pricing.vue',
        'Testimonials.vue',
        'GetEmail.vue',
      ];

      const components = await Promise.all(componentNames.map(async (name) => {
        const content = await fetchComponentContent(name);
        return { name, content };
      }));

      return components;
    },
    async getStarsImage() {
      const response = await fetch('/path/to/stars.png');
      const blob = await response.blob();
      return blob;
    },
    generatePreviewUrl() {
      const configName = this.config.configName;
      const userId = this.userId;
      const baseUrl = window.location.origin;
      return `${baseUrl}/page?configName=${configName}&userId=${userId}`;
    },
    preventNavigation(event) {
      const target = event.target;
      if (target.tagName === 'A') {
        event.preventDefault();
        console.log('Navigation empêchée vers :', target.href);
      }
    },
  }
}
</script>
