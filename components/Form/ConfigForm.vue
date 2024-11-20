<template>
  <div class="py-8">
    <div
      class="rounded-lg shadow-xl w-[90%] max-lg:w-[100%] mx-auto p-4 md:p-8 bg-gray-50 dark:bg-gray-800 min-h-[40rem] max-lg:min-h-[55rem] relative">
      <form @submit.prevent="submitForm" class="space-y-6 dark:text-white">
        <h2 v-if="!configName" class="text-xl font-amsterdam text-center py-4">
          Créer une nouvelle configuration
        </h2>
        <h2 v-else class="text-xl font-amsterdam text-center">
          {{ configName }}
        </h2>
        <FormStep1 v-if="currentStep === 1" :config="config" :configName="configName"
          @update-config="handleConfigUpdate" @file-selected="handleFileUpload" />
        <FormStep2 v-if="currentStep === 2" :advantages="config.advantages" @updateAdvantages="updateAdvantages" />
        <FormStep3 v-if="currentStep === 3" :pricing="config.pricing" @update-pricing="updatePricing" />
        <FormStep4 v-if="currentStep === 4" :testimonials="config.testimonials"
          @update-testimonials="updateTestimonials" />
        <div class="absolute bottom-0 right-0 flex justify-end space-x-2 p-10">
          <Button :level="4" v-if="currentStep > 1 && !isLoading" @click.prevent="currentStep--">
            Précédent
          </Button>
          <Button v-if="currentStep < 4" @click.prevent="currentStep++">
            Suivant
          </Button>
          <Button v-if="currentStep === 4 && !isLoading" type="submit">
            {{ isEditMode ? "Mettre à jour" : "Enregistrer" }}
          </Button>
          <span v-if="isLoading">
            <Icon name="line-md:loading-loop" class="w-10 h-10 text-gray-600 dark:text-slate-700" />
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: { type: String, required: true },
    initialConfig: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      currentStep: 1,
      isEditMode: false,
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
      pendingUploads: {},
      isLoading: false,
    };
  },
  created() {
    if (this.initialConfig) {
      this.isEditMode = true;
      this.configName = this.initialConfig.configName;
      this.config = { ...this.initialConfig };
    }
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
    async handleFileUpload({ key, file, fileName }) {
      this.pendingUploads[key] = { file, fileName };
      this.config[key] = fileName;
      console.log(this.config);

    },
    async submitForm() {
      this.isLoading = true;
      try {
        for (const [key, { file }] of Object.entries(this.pendingUploads)) {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch(`/api/uploadFile?key=${key}&userId=${this.userId}`, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Erreur lors de l'upload de ${key}`);
          }

          const result = await response.json();
          this.config[key] = result.url;
        }

        const newConfig = {
          ...this.config,
          createdAt: this.isEditMode
            ? this.initialConfig.createdAt
            : new Date().toISOString(),
        };

        const apiUrl = this.isEditMode ? "/api/updateConfig" : "/api/saveConfig";
        const result = await $fetch(apiUrl, {
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
        this.pendingUploads = {};
        alert(result.message);
        this.$router.go(0);
      } catch (error) {
        console.error("Erreur lors de la soumission du formulaire:", error);
        alert("Erreur lors de la soumission du formulaire: " + error.message);
      } finally {
        this.isLoading = false;
      }
    }
  },
};
</script>
