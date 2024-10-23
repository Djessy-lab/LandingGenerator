<template>
  <div class="flex min-h-[100vh] sticky top-0 bg-gray-100 dark:bg-gray-900">
    <aside :class="sideBarClasses">
      <ThemeToggle size="sm" />
      <div class="mt-4 w-full" v-if="isSidebarOpen">
        <h2 class="text-lg font-bold mb-4">Configurations</h2>
        <ul class="space-y-2 flex-1">
          <li
            @click="toggleConfigsView"
            class="flex justify-between items-center w-full hover:bg-white dark:hover:bg-slate-900 p-2 rounded-lg text-blue-600 dark:text-blue-100 cursor-pointer"
          >
            Voir les configurations
            <Icon
              name="line-md:watch"
              class="text-blue-600 dark:text-blue-100 h-5 w-5 items-center"
            />
          </li>
          <li
            @click="toggleNewConfigView"
            class="flex justify-between items-center w-full hover:bg-white dark:hover:bg-slate-900 p-2 rounded-lg text-blue-600 dark:text-blue-100 cursor-pointer"
          >
            Créer une configuration
            <Icon
              name="line-md:plus-circle"
              class="text-blue-600 dark:text-blue-100 h-5 w-5 items-center"
            />
          </li>
        </ul>
      </div>
      <div
        v-if="userEmail && isSidebarOpen"
        @click="logout"
        class="flex justify-between items-center mt-auto text-red-600 dark:text-red-100 hover:bg-white dark:hover:bg-slate-900 p-2 w-full rounded-lg cursor-pointer"
      >
        Se déconnecter
        <Icon
          name="line-md:log-out"
          class="text-red-600 dark:text-red-100 h-5 w-5 items-center"
        />
      </div>
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

    <main class="flex-1 p-4 dark:bg-gray-900">
      <h3 class="text-2xl font-prompt">
        Bienvenue sur le tableau de bord {{ userEmail }}
      </h3>
      <div v-if="configsView" class="mt-12">
        <p v-if="!userConfigs.length">
          {{ noConfigMessage }}
        </p>
        <div v-else :class="configsViewClasses">
          <div v-for="(config, index) in userConfigs" :key="index">
            <ConfigCard :config="config" @click="openConfig(config)" />
          </div>
        </div>
      </div>
      <div v-if="newConfigView">
        <ConfigForm
          :userId="userId"
          @configUpdated="updateConfig"
          :userEmail="userEmail"
        />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  props: {
    userEmail: { type: String, default: null },
    userId: { type: Number, required: true },
    userConfigs: { type: Array, default: () => [] },
  },
  data() {
    return {
      currentConfig: null,
      configsView: true,
      newConfigView: false,
      isSidebarOpen: true,
      noConfigMessage:
        "Vous n'avez pas encore de configurations, créez-en une en quelques clics !",
    };
  },
  computed: {
    iconSideBar() {
      return this.isSidebarOpen
        ? "line-md:menu-to-close-alt-transition"
        : "line-md:close-to-menu-transition";
    },
    buttonToggleSideBarClasses() {
      return `transform transition-transform duration-500 left-auto mt-2 ${
        this.isSidebarOpen ? "translate-x-52" : "translate-x-0"
      }`;
    },
    sideBarClasses() {
      return `bg-gray-200 dark:bg-gray-800 p-4 shadow-lg flex flex-col items-start transform transition-all duration-500 overflow-hidden ${
        this.isSidebarOpen
          ? "translate-x-0 w-64 opacity-100"
          : "-translate-x-full w-0 opacity-0"
      }`;
    },
    configsViewClasses() {
      return `grid gap-4 max-lg:grid-cols-1 ${
        this.isSidebarOpen ? "grid-cols-2" : "grid-cols-3"
      }`;
    },
  },
  methods: {
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
    },
    toggleNewConfigView() {
      this.newConfigView = true;
      this.configsView = false;
    },
    openConfig(config) {
      this.$router.push({
        path: "/page",
        query: { configName: config.configName, userId: this.userId },
      });
    },
  },
};
</script>
