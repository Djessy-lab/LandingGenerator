<template>
  <div class="bg-neutral-100 dark:bg-slate-800 min-h-screen relative">
    <div class="absolute top-4 right-3">
      <ThemeToggle size="sm" />
    </div>
    <Toast
      :modelValue="toastValue"
      @update:modelValue="toastValue = false"
      title="Succès"
      message="Le dépôt a été créé et le projet a été pushé avec succès !"
      type="success"
      :link="repoUrl"
    />
    <div class="absolute top-4 left-3">
      <RouterLink to="/">
        <Icon
          name="line-md:arrow-left"
          class="w-8 h-8 text-gray-600 dark:text-gray-50"
        />
      </RouterLink>
    </div>
    <h1 class="text-4xl font-prompt text-center py-4">
      Exporter la configuration
    </h1>
    <div class="w-[80%] max-lg:w-[100%] mx-auto">
      <Tabs :tabs="tabs">
        <template #preview>
          <div class="w-full h-[40rem] rounded-lg mx-auto">
            <iframe
              ref="previewIframe"
              :src="previewUrl"
              class="w-full h-full rounded-b-lg"
              frameborder="0"
              sandbox="allow-same-origin allow-scripts"
            ></iframe>
          </div>
        </template>
        <template #deploy>
          <div class="h-[40rem]">
            <DeployCard
              :isLoading="isLoading"
              :deployButton="deployButton"
              :repoUrl="repoUrl"
              @create-repo="createRepo"
              @deploy-repo="deployRepo"
            />
          </div>
        </template>
        <template #export>
          <div class="h-[40rem]">
            <ExportCard @exportConfig="exportConfig" />
          </div>
        </template>
      </Tabs>
    </div>
  </div>
</template>

<script>
import ProjectExporter from '../utils/ProjectExporter';

export default {
  name: "Export",
  data() {
    return {
      config: null,
      previewUrl: "",
      userId: null,
      deployView: false,
      isLoading: false,
      toastValue: false,
      deployButton: false,
      repoUrl: "",
      tabs: [
        { label: "Aperçu", value: "preview" },
        { label: "Exporter le code", value: "export" },
        { label: "Déployer le code", value: "deploy" },
      ],
      projectExporter: null,
    };
  },
  async mounted() {
    const config = sessionStorage.getItem("exportConfig");
    if (config) {
      this.config = JSON.parse(config);
      sessionStorage.removeItem("exportConfig");
      this.userId = this.$route.query.userId;
      this.previewUrl = this.generatePreviewUrl();
      this.projectExporter = new ProjectExporter(this.config);
    } else {
      this.$router.push("/");
    }
    this.$nextTick(() => {
      const iframe = this.$refs.previewIframe;
      iframe.onload = () => {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.addEventListener("click", this.preventNavigation);
      };
    });
  },
  beforeDestroy() {
    const iframe = this.$refs.previewIframe;
    if (iframe) {
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      iframeDocument.removeEventListener("click", this.preventNavigation);
    }
  },
  methods: {
    async exportConfig() {
      await this.projectExporter.exportConfig();
    },
    async createRepo() {
      let token = localStorage.getItem("github_token");

      if (!token) {
        const { getSession } = useAuth();
        const session = await getSession();

        if (session?.accessToken) {
          token = session.accessToken;
          localStorage.setItem("github_token", token);
        } else {
          this.$router.push("/login");
          return;
        }
      }

      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (!userResponse.ok) {
        console.error("Invalid token:", await userResponse.json());
        this.$router.push("/login");
        return;
      }

      const tokenScopes = userResponse.headers.get("x-oauth-scopes");

      if (!tokenScopes.includes("repo")) {
        console.error("Token does not have the 'repo' scope");
        this.$router.push("/login");
        return;
      }

      const userData = await userResponse.json();
      const owner = userData.login;
      const repoName = this.config.configName;
      this.isLoading = true;

      try {
        this.repoUrl = await this.projectExporter.createRepo(token, owner);
        this.isLoading = false;
        this.deployButton = true;
        this.toastValue = true;
      } catch (error) {
        console.error(error);
        alert(`Erreur : ${error.message}`);
        this.isLoading = false;
      }
    },
    generatePreviewUrl() {
      const configName = this.config.configName;
      const userId = this.userId;
      const baseUrl = window.location.origin;
      return `${baseUrl}/page?configName=${configName}&userId=${userId}`;
    },
    preventNavigation(event) {
      const target = event.target;
      if (target.tagName === "A") {
        event.preventDefault();
      }
    },
    async deployRepo() {
      const response = await fetch("https://api.vercel.com/v1/deployments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.vercelToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.config.configName,
        }),
      });
      const data = await response.json();
      console.log("Déploiement effectué :", data);
    },
  },
};
</script>
