<template>
  <div class="py-8">
    <div
      class="rounded-lg shadow-xl w-[90%] max-lg:w-[100%] mx-auto p-4 md:p-8 bg-gray-50 dark:bg-gray-800 min-h-[38rem] max-lg:min-h-[55rem] relative">
      <form @submit.prevent="submitForm" class="space-y-6 dark:text-white">
        <h2 v-if="!configName" class="text-xl font-amsterdam text-center py-4">
          Créer une nouvelle configuration
        </h2>
        <h2 v-else class="text-xl font-amsterdam text-center">
          {{ configName }}
        </h2>
        <Step1 v-if="currentStep === 1" :config="config" :configName="configName" @update-config="handleConfigUpdate" />
        <Step2 v-if="currentStep === 2" :advantages="config.advantages" @updateAdvantages="updateAdvantages" />
        <Step3 v-if="currentStep === 3" :pricing="config.pricing" @update-pricing="updatePricing" />
        <Step4 v-if="currentStep === 4" :testimonials="config.testimonials" @update-testimonials="updateTestimonials" />

        <div class="absolute bottom-0 right-0 flex justify-end space-x-2 p-10">
          <button v-if="currentStep > 1" @click.prevent="currentStep--"
            class="bg-white text-black hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-black dark:text-white border dark:border-black p-2 w-32 h-10 rounded-lg">
            Précédent
          </button>
          <button v-if="currentStep < 4" @click.prevent="currentStep++"
            class="bg-gray-800 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 border dark:border-black p-2 w-32 h-10 rounded-lg ml-2">
            Suivant
          </button>

          <button v-if="currentStep === 4" type="submit"
            class="bg-gray-800 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 border dark:border-black p-2 w-32 h-10 rounded-lg ml-2">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userId: { type: String, required: true },
  },
  data() {
    return {
      currentStep: 1,
      configName: "",
      config: {
        appName: "",
        titleHero: "",
        descriptionHero: "",
        color: "",
        imgHero: "",
        imgArg: "",
        advantages: [],
        testimonials: [],
        pricing: [],
      },
    };
  },
  methods: {
    updatePricing(updatedPricing) {
      this.config.pricing = updatedPricing;
    },
    updateTestimonials(updatedTestimonials) {
      this.config.testimonials = updatedTestimonials;
    },
    updateAdvantages(updatedAdvantages) {
      this.config.advantages = updatedAdvantages;
    },
    handleConfigUpdate({ config, configName }) {
      this.config = config;
      this.configName = configName;
    },
    async submitForm() {
      try {
        const newConfig = {
          ...this.config,
          createdAt: new Date().toISOString(),
        };

        const result = await $fetch("/api/saveConfig", {
          method: "POST",
          body: {
            userId: this.userId,
            configName: this.configName,
            config: newConfig,
          },
        });
        if (result.error) {
          throw new Error(result.error);
        }
        alert(result.message);
        this.$router.go(0);
      } catch (error) {
        console.error("Erreur lors de la soumission du formulaire:", error);
        alert("Erreur lors de la soumission du formulaire: " + error.message);
      }
    },
  },
};
</script>
