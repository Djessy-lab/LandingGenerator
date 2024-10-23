<template>
  <div class="flex min-h-[100vh] sticky top-0 bg-gray-100">
    <aside
      class="w-1/4 bg-gray-200 dark:bg-gray-800 p-4 shadow-lg flex flex-col items-start"
    >
      <ThemeToggle size="sm" />
      <div class="mt-4 w-full">
        <h2 class="text-lg font-bold mb-4">Configurations</h2>
        <ul class="space-y-2 flex-1">
          <li
            @click="
              configsView = true;
              newConfigView = false;
            "
            class="flex justify-between items-center w-full hover:bg-white dark:hover:bg-slate-900 p-2 rounded-lg text-blue-600 dark:text-blue-100 cursor-pointer"
          >
            Voir les configurations
            <Icon name="lucide:eye" class="text-blue-600 dark:text-blue-100 h-5 w-5 items-center" />
          </li>
          <li
            @click="
              newConfigView = true;
              configsView = false;
            "
            class="flex justify-between items-center w-full hover:bg-white dark:hover:bg-slate-900 p-2 rounded-lg text-blue-600 dark:text-blue-100 cursor-pointer"
          >
            Créer une nouvelle configuration
            <Icon name="lucide:plus" class="text-blue-600 dark:text-blue-100 h-5 w-5 items-center" />
          </li>
        </ul>
      </div>
      <div
        v-if="userEmail"
        @click="logout"
        class="flex justify-between items-center mt-auto text-red-600 dark:text-red-100 hover:bg-white dark:hover:bg-slate-900 p-2 w-full rounded-lg cursor-pointer"
      >
        Se déconnecter
        <Icon name="line-md:log-out" class="text-red-600 dark:text-red-100 h-5 w-5 items-center" />
      </div>
    </aside>
    <main class="flex-1 p-4 dark:bg-gray-600">
      <h3 class="text-2xl font-semibold">
        Bienvenue sur le tableau de bord {{ userEmail }}
      </h3>
      <div v-if="configsView" class="mt-12">
        <p v-if="!userConfigs.length">
          Vous n'avez pas encore de configurations, créez en une en quelques
          clics !
        </p>
        <div v-else class="grid grid-cols-2 gap-4">
          <div v-for="(config, index) in userConfigs" :key="index">
            <ConfigCard
              :config="config"
              @click="
                $router.push({
                  path: '/page',
                  query: { configName: config.configName, userId: userId },
                })
              "
              class="cursor-pointer"
            />
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
    };
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
          error
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
  },
};
</script>
