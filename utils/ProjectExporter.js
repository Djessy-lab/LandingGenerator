import JSZip from 'jszip';
import FileSaver from 'file-saver';

class ProjectExporter {
  constructor(config) {
    this.config = config;
    this.projectContent = null;
  }

  async exportConfig() {
    await this.createProject();
    FileSaver.saveAs(this.projectContent, `${this.config.configName}.zip`);
  }

  async createProject() {
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
    components.forEach((component) => {
      landingFolder.file(component.name, component.content);
    });

    const publicFolder = folder.folder("public");
    const imgFolder = publicFolder.folder("img");
    imgFolder.file("stars.png", await this.getStarsImage());

    this.projectContent = await zip.generateAsync({ type: "blob" });
  }

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
  }

  generateAppContent() {
    return `<template>
  <div class="dark:bg-gray-900 dark:text-white min-h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
`;
  }

  generateIndexContent() {
    return `<template>
  <LandingPage />
</template>

<script>
<\/script>
`;
  }

  generatePackageJson() {
    return JSON.stringify(
      {
        name: this.config.configName,
        private: true,
        type: "module",
        scripts: {
          build: "nuxt build",
          dev: "nuxt dev",
          generate: "nuxt generate",
          preview: "nuxt preview",
          postinstall: "nuxt prepare",
        },
        dependencies: {
          "@nuxt/icon": "^1.5.0",
          "@nuxtjs/color-mode": "^3.4.2",
          dayjs: "^1.11.13",
          dotenv: "^16.4.5",
          "file-saver": "^2.0.5",
          jsonwebtoken: "^9.0.2",
          nodemailer: "^6.9.14",
          nuxt: "^3.12.4",
          "nuxt-lucide-icons": "^1.0.5",
          tailwindcss: "^3.4.16",
          vue: "latest",
        },
        devDependencies: {
          "@nuxtjs/tailwindcss": "^6.12.2",
          "@types/jsonwebtoken": "^9.0.7",
        },
      },
      null,
      2,
    );
  }

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
  }

  async getLandingComponents() {
    const componentNames = [
      "HeroSection.vue",
      "Advantages.vue",
      "HowItsWorks.vue",
      "Pricing.vue",
      "Testimonials.vue",
      "GetEmail.vue",
    ];

    const components = await Promise.all(
      componentNames.map(async (name) => {
        const content = await fetchComponentContent(name);
        return { name, content };
      }),
    );

    return components;
  }

  async getStarsImage() {
    const response = await fetch("/img/stars.png");
    const blob = await response.blob();
    return blob;
  }

  generatePreviewUrl() {
    const configName = this.config.configName;
    const userId = this.userId;
    const baseUrl = window.location.origin;
    return `${baseUrl}/page?configName=${configName}&userId=${userId}`;
  }

  async createRepo(token, owner) {
    const repoName = this.config.configName;
    await this.createProject();

    try {
      const createRepoResponse = await fetch(
        "https://api.github.com/user/repos",
        {
          method: "POST",
          headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: repoName, private: true }),
        },
      );
      const repoData = await createRepoResponse.json();

      if (!createRepoResponse.ok) {
        throw new Error(
          `Erreur lors de la création du dépôt : ${repoData.message}`,
        );
      }

      const zipBlob = this.projectContent;
      if (!zipBlob) throw new Error("Le contenu du projet n'est pas prêt.");

      const zip = await JSZip.loadAsync(zipBlob);

      function encodePath(path) {
        return path.split("/").map(encodeURIComponent).join("/");
      }

      async function getFileSha(owner, repo, path, token) {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          return data.sha;
        } else if (response.status === 404) {
          return null;
        } else {
          const error = await response.json();
          throw new Error(
            `Erreur lors de la vérification du fichier ${path} : ${error.message}`,
          );
        }
      }
      for (const relativePath in zip.files) {
        const zipEntry = zip.files[relativePath];
        if (!zipEntry.dir) {
          const encodedPath = encodePath(relativePath);
          const base64Content = await zipEntry.async("base64");
          try {
            const existingSha = await getFileSha(
              owner,
              repoName,
              encodedPath,
              token,
            );
            const body = {
              message: `Ajout du fichier ${relativePath}`,
              content: base64Content,
              branch: "main",
            };
            if (existingSha) {
              body.sha = existingSha;
            }
            const response = await fetch(
              `https://api.github.com/repos/${owner}/${repoName}/contents/${encodedPath}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `token ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
              },
            );
            if (!response.ok) {
              const error = await response.json();
              console.error("Réponse de l'API GitHub :", error);
              throw new Error(
                `Erreur lors de l'ajout du fichier ${relativePath} : ${error.message}`,
              );
            }
          } catch (error) {
            console.error(
              `Erreur lors de l'ajout du fichier ${relativePath} :`,
              error,
            );
            throw error;
          }
        }
      }
      return repoData.html_url;
    } catch (error) {
      console.error(error);
      throw new Error(`Erreur : ${error.message}`);
    }
  }
}

export default ProjectExporter;