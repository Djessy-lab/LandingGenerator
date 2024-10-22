<template>
  <Saas v-if="currentConfig" v-bind="currentConfig" />
  <div v-else>Chargement...</div>
</template>

<script>
export default {
  name: 'page',
  data() {
    return {
      currentConfig: null,
      userId: null,
    };
  },
  async mounted() {
    const configName = this.$route.query.configName;
    this.userId = this.$route.query.userId

    if (configName && this.userId) {
      try {
        const configs = await $fetch(`/api/getConfig?userId=${this.userId}`);

        this.currentConfig = configs.find(config => config.configName === configName);

        if (!this.currentConfig) {
          console.error('Configuration non trouvée pour le nom:', configName);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la configuration:', error);
      }
    }
  }
}
</script>
