<template>
  <div
    class="lg:flex max-lg:w-[100%] min-h-[100vh] sticky top-0 bg-gray-100 dark:bg-gray-900"
  >
    <aside :class="sideBarClasses">
      <ThemeToggle size="sm" />
      <div class="mt-4 w-full" v-if="isSidebarOpen">
        <h2 class="text-lg font-bold mb-4">Configurations</h2>
        <ul class="space-y-2 flex-1">
          <li>
            <Button @click="toggleConfigsView" :level="6">
              Voir les configurations
              <Icon
                name="line-md:watch"
                class="text-blue-600 dark:text-blue-100 h-5 w-5 items-center"
              />
            </Button>
          </li>
          <li>
            <Button @click="toggleNewConfigView" :level="6">
              Créer une configuration
              <Icon
                name="line-md:plus-circle"
                class="text-blue-600 dark:text-blue-100 h-5 w-5 items-center"
              />
            </Button>
          </li>
        </ul>
      </div>
      <Button
        v-if="userEmail && isSidebarOpen"
        @click="logout"
        :level="7"
        class="mt-auto"
      >
        Se déconnecter
        <Icon
          name="line-md:log-out"
          class="text-red-600 dark:text-red-100 h-5 w-5 items-center"
        />
      </Button>
    </aside>
    <button
      @click="toggleSidebar"
      class="p-2 rounded-lg absolute z-10"
      :class="buttonToggleSideBarClasses"
    >
      <Icon
        :name="iconSideBar"
        class="text-gray-600 dark:text-gray-200 h-5 w-5"
      />
    </button>
    <main class="flex-1 p-4 dark:bg-gray-900 overflow-y-auto max-h-[100vh]">
      <Toast
        :modelValue="isToastVisible"
        :title="toast.title"
        :message="toast.message"
        :type="toast.type"
        @update:modelValue="isToastVisible = false"
      />
      <div class="w-full flex justify-between">
        <div>
          <h3 class="text-2xl font-prompt">Tableau de bord</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Connecté en tant que : {{ userEmail }}
          </p>
        </div>
        <div>
          <img
            v-if="userImage"
            :src="userImage"
            class="rounded-full w-10 h-10 mr-4"
            alt="Avatar"
          />
        </div>
      </div>
      <div v-if="configsView" class="mt-10">
        <p v-if="!userConfigs.length">
          {{ noConfigMessage }}
        </p>
        <div v-else :class="configsViewClasses">
          <div v-for="(config, index) in userConfigs" :key="index">
            <ConfigCard
              :config="config"
              hasOptionsCard
              @openConfig="openConfig"
              @deleteConfig="askDeleteConfig(config)"
              @editConfig="editConfig(config)"
              @exportConfig="exportConfig(config)"
            />
          </div>
        </div>
      </div>
      <div v-if="newConfigView">
        <FormConfigForm
          :userId="String(userId)"
          @configUpdated="updateConfig"
          :userEmail="userEmail"
        />
      </div>
      <div v-else-if="editConfigView">
        <Icon
          name="line-md:arrow-left"
          class="text-gray-600 dark:text-white h-5 w-5 mt-5 ml-5 cursor-pointer"
          @click="
            editConfigView = false;
            configsView = true;
          "
        />
        <FormConfigForm
          :userId="String(userId)"
          @configUpdated="updateConfig"
          :userEmail="userEmail"
          :initial-config="currentConfig"
        />
      </div>
      <Modal
        v-if="showConfirmDialog"
        :modelValue="showConfirmDialog"
        @update:modelValue="showConfirmDialog = false"
        title="Confirmer la suppression"
        content="Êtes-vous sûr de vouloir supprimer cette configuration ?"
        :buttons="buttonsModal"
      />
    </main>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      currentConfig: null,
      configsView: true,
      editConfigView: false,
      newConfigView: false,
      isSidebarOpen: true,
      noConfigMessage:
        "Vous n'avez pas encore de configurations, créez-en une en quelques clics !",
      showConfirmDialog: false,
      buttonsModal: [
        {
          text: "Supprimer",
          type: "delete",
          click: () => this.deleteConfig(this.currentConfig),
        },
        {
          text: "Annuler",
          type: "cancel",
          click: () => (this.showConfirmDialog = false),
        },
      ],
      toast: {
        title: "",
        message: "",
        type: "",
      },
      isToastVisible: false,
    };
  },
  props: {
    userEmail: { type: String, default: null },
    userId: { type: String, default: '' },
    userImage: { type: String, default: null },
    userConfigs: { type: Array, default: () => [] },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
    const toastData = localStorage.getItem("toastData");
    if (toastData) {
      const parsedToast = JSON.parse(toastData);
      this.toast = { ...parsedToast };
      this.isToastVisible = true;
      if(this.toast.type === 'success') {
        this.triggerConfetti();
      }
      localStorage.removeItem("toastData");
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  computed: {
    iconSideBar() {
      return this.isSidebarOpen
        ? "line-md:menu-to-close-alt-transition"
        : "line-md:close-to-menu-transition";
    },
    buttonToggleSideBarClasses() {
      return `transform transition-transform duration-500 left-auto mt-2 ${
        this.isSidebarOpen
          ? "translate-x-52 max-lg:absolute max-lg:top-0 max-lg:right-52 "
          : "translate-x-0 max-lg:absolute max-lg:top-0 max-lg:right-2"
      }`;
    },
    sideBarClasses() {
      return `bg-gray-200 dark:bg-gray-800 p-4 shadow-lg relative flex flex-col items-start transform transition-all duration-500 overflow-hidden ${
        this.isSidebarOpen
          ? "translate-x-0 w-64 max-lg:w-full max-lg:translate-y-0 opacity-100"
          : "translate-x-full w-0 max-lg:-translate-y-full opacity-0"
      }`;
    },
    configsViewClasses() {
      return `grid gap-8 max-lg:grid-cols-1 ${
        this.isSidebarOpen ? "grid-cols-3" : "grid-cols-4"
      }`;
    },
  },
  methods: {
    handleKeyDown(event) {
      if (event.key === "Escape" && this.showConfirmDialog) {
        this.showConfirmDialog = false;
      }
    },
    async updateConfig(configName) {
      try {
        const config = await $fetch(`/api/getConfig?configName=${configName}`);
        if (!config.error) {
          this.currentConfig = config;
        } else {
          console.error(config.error);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la configuration:",
          error,
        );
      }
    },
    async logout() {
      try {
        const token = localStorage.getItem("token");
        const response = await $fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          localStorage.removeItem("token");
          this.$router.push("/login");
        } else {
          console.error("Erreur lors de la déconnexion:", response.message);
        }
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleConfigsView() {
      this.configsView = true;
      this.newConfigView = false;
      this.editConfigView = false;
    },
    toggleNewConfigView() {
      this.newConfigView = true;
      this.configsView = false;
      this.editConfigView = false;
    },
    openConfig(config) {
      sessionStorage.setItem('userId', this.userId);
      this.$router.push({
        path: "/page",
        query: { name: config.configName },
      });
    },
    askDeleteConfig(config) {
      this.currentConfig = config;
      this.showConfirmDialog = true;
    },
    editConfig(config) {
      this.currentConfig = config;
      this.editConfigView = true;
      this.configsView = false;
    },
    async deleteConfig(config) {
      try {
        const response = await $fetch(
          `/api/deleteConfig?userId=${this.userId}&configName=${config.configName}`,
          {
            method: "DELETE",
          },
        );
        this.showConfirmDialog = false;
        this.$router.go(0);
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de la configuration:",
          error,
        );
      }
    },
    async exportConfig(config) {
      sessionStorage.setItem("exportConfig", JSON.stringify(config));
      sessionStorage.setItem("userId", this.userId);
      this.$router.push(`/export`);
    },
    triggerConfetti() {
      const colors = ["#bb0000", "#0000ee", "#f9ff33"];
      const end = Date.now() + 1.5 * 1000;
      function frame() {
        useConfetti({
          particleCount: 3,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors: colors,
        });
        useConfetti({
          particleCount: 3,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }
      requestAnimationFrame(frame);
    },
  },
};
</script>
