<template>
  <div class="lg:flex max-lg:w-[100%] min-h-[100vh] sticky top-0 bg-gray-100 dark:bg-gray-900">
    <aside :class="sideBarClasses">
      <ThemeToggle size="sm" />
      <div class="mt-4 w-full" v-if="isSidebarOpen">
        <h2 class="text-lg font-bold mb-4">Configurations</h2>
        <ul class="space-y-2 flex-1">
          <li>
            <button @click="toggleConfigsView"
              class="flex justify-between items-center w-full hover:bg-white dark:hover:bg-slate-900 p-2 rounded-lg text-blue-600 dark:text-blue-100 cursor-pointer">
              Voir les configurations
              <Icon name="line-md:watch" class="text-blue-600 dark:text-blue-100 h-5 w-5 items-center" />
            </button>
          </li>
          <li>
            <button @click="toggleNewConfigView"
              class="flex justify-between items-center w-full hover:bg-white dark:hover:bg-slate-900 p-2 rounded-lg text-blue-600 dark:text-blue-100 cursor-pointer">
              Créer une configuration
              <Icon name="line-md:plus-circle" class="text-blue-600 dark:text-blue-100 h-5 w-5 items-center" />
            </button>
          </li>
        </ul>
      </div>
      <button v-if="userEmail && isSidebarOpen" @click="logout"
        class="flex justify-between items-center mt-auto text-red-600 dark:text-red-100 hover:bg-white dark:hover:bg-slate-900 p-2 w-full rounded-lg cursor-pointer">
        Se déconnecter
        <Icon name="line-md:log-out" class="text-red-600 dark:text-red-100 h-5 w-5 items-center" />
      </button>
    </aside>
    <button @click="toggleSidebar" class="p-2 rounded-lg absolute z-10" :class="buttonToggleSideBarClasses">
      <Icon :name="iconSideBar" class="text-gray-600 dark:text-gray-200 h-5 w-5" />
    </button>
    <main class="flex-1 p-4 dark:bg-gray-900 overflow-y-auto max-h-[100vh]">
      <h3 class="text-2xl font-prompt">
        Bienvenue sur le tableau de bord {{ userEmail }}
      </h3>
      <div v-if="configsView" class="mt-12">
        <p v-if="!userConfigs.length">
          {{ noConfigMessage }}
        </p>
        <div v-else :class="configsViewClasses">
          <div v-for="(config, index) in userConfigs" :key="index">
            <ConfigCard :config="config" @openConfig="openConfig" @deleteConfig="askDeleteConfig(config)"
              @editConfig="editConfig(config)" />
          </div>
        </div>
      </div>
      <div v-if="newConfigView">
        <ConfigForm :userId="String(userId)" @configUpdated="updateConfig" :userEmail="userEmail" />
      </div>
      <div v-else-if="editConfigView">
        <Icon name="line-md:arrow-left" class="text-gray-600 dark:text-white h-5 w-5 mt-5 ml-5 cursor-pointer"
          @click="editConfigView = false; configsView = true" />
        <ConfigForm :userId="String(userId)" @configUpdated="updateConfig" :userEmail="userEmail"
          :initial-config="currentConfig" />
      </div>

      <div v-if="showConfirmDialog" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 class="text-lg font-semibold mb-4">Confirmer la suppression</h3>
          <p>Êtes-vous sûr de vouloir supprimer cette configuration ?</p>
          <div class="mt-4 flex justify-end space-x-2">
            <button @click="deleteConfig(currentConfig)"
              class="bg-red-600 text-white px-4 py-2 rounded-lg">Supprimer</button>
            <button @click="showConfirmDialog = false"
              class="bg-gray-300 text-black px-4 py-2 rounded-lg">Annuler</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import config from '~/data/config';

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
      editConfigView: false,
      newConfigView: false,
      isSidebarOpen: true,
      noConfigMessage: "Vous n'avez pas encore de configurations, créez-en une en quelques clics !",
      showConfirmDialog: false,
    };
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  computed: {
    iconSideBar() {
      return this.isSidebarOpen
        ? "line-md:menu-to-close-alt-transition"
        : "line-md:close-to-menu-transition";
    },
    buttonToggleSideBarClasses() {
      return `transform transition-transform duration-500 left-auto mt-2 ${this.isSidebarOpen ? "translate-x-52 max-lg:absolute max-lg:top-0 max-lg:right-52 " : "translate-x-0 max-lg:absolute max-lg:top-0 max-lg:right-2"
        }`;
    },
    sideBarClasses() {
      return `bg-gray-200 dark:bg-gray-800 p-4 shadow-lg relative flex flex-col items-start transform transition-all duration-500 overflow-hidden ${this.isSidebarOpen
        ? "translate-x-0 w-64 max-lg:w-full max-lg:translate-y-0 opacity-100"
        : "translate-x-full w-0 max-lg:-translate-y-full opacity-0"
        }`;
    },
    configsViewClasses() {
      return `grid gap-8 max-lg:grid-cols-1 ${this.isSidebarOpen ? "grid-cols-3" : "grid-cols-4"
        }`;
    },
  },
  methods: {
    handleKeyDown(event) {
      if (event.key === 'Escape' && this.showConfirmDialog) {
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
        console.error("Erreur lors de la récupération de la configuration:", error);
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
        const response = await $fetch(`/api/deleteConfig?userId=${this.userId}&configName=${config.configName}`, {
          method: 'DELETE'
        });
        this.showConfirmDialog = false;
        this.$router.go(0);
      } catch (error) {
        console.error("Erreur lors de la suppression de la configuration:", error);
      }
    }
  },
};
</script>
