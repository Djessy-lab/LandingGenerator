<template>
  <div class="flex min-h-[100vh] sticky top-0 bg-gray-100">
    <aside class="w-1/4 bg-gray-200 dark:bg-gray-800 p-4 shadow-lg">
      <ThemeToggle size="sm" />
      <h2 class="text-lg font-bold mb-4">Configurations</h2>
      <ul class="space-y-2">
        <li>
          <p
            @click="
              configsView = !configsView;
              newConfigView = false;
            "
            class="text-blue-600 hover:underline cursor-pointer"
          >
            Voir les configurations
          </p>
        </li>
        <li>
          <p
            @click="
              newConfigView = !newConfigView;
              configsView = false;
            "
            class="text-blue-600 hover:underline cursor-pointer"
          >
            Créer une nouvelle configuration
          </p>
        </li>
      </ul>
    </aside>
    <main class="flex-1 p-4 dark:bg-gray-600">
      <h1 class="text-2xl font-semibold">
        Bienvenue sur le tableau de bord {{ userEmail }}
      </h1>
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
  },
};
</script>
