<template>
  <div class="relative" :class="currentConfig && !currentConfig.squared ? 'dark:bg-gray-900 dark:text-white' : ''">
    <div v-if="currentConfig && currentConfig.squared"
      class="absolute inset-0 h-full w-full dark:bg-gray-900 dark:bg-[linear-gradient(to_right,#022c22,transparent_1px),linear-gradient(to_bottom,#022c22,transparent_1px)] bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]"
      style="z-index: -1"></div>
    <LandingPage v-if="currentConfig" :key="currentConfig.configName" v-bind="currentConfig" />
    <div v-else class="flex justify-center p-10">
      <Icon name="line-md:loading-loop" class="w-48 h-48 text-gray-600" />
    </div>
  </div>
</template>

<script>
export default {
  name: "page",
  data() {
    return {
      currentConfig: null,
      userId: null,
    };
  },
  async mounted() {
    const configName = this.$route.query.name;
    this.userId = sessionStorage.getItem('userId');

    if (configName && this.userId) {
      try {
        const configs = await $fetch(`/api/getConfig?userId=${this.userId}`);

        this.currentConfig = configs.find((config) => config.configName === configName);

        if (!this.currentConfig) {
          console.error("Configuration non trouvée pour le nom:", configName);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la configuration:", error);
      }
    }
  },
};
</script>
