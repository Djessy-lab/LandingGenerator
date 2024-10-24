<template>
  <div class="py-8">
    <div
      class="rounded-lg shadow-xl w-[90%] max-lg:w-[100%] mx-auto p-4 md:p-8 bg-gray-50 dark:bg-gray-800 min-h-[38rem] max-lg:min-h-[55rem] relative"
    >
      <form @submit.prevent="submitForm" class="space-y-6 dark:text-white">
        <h2 v-if="!configName" class="text-xl font-amsterdam text-center py-4">
          Créer une nouvelle configuration
        </h2>
        <h2 v-else class="text-xl font-amsterdam text-center">
          {{ configName }}
        </h2>

        <div v-if="currentStep === 1">
          <h3 class="text-xl font-semibold mb-4">Informations de base</h3>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div
              v-for="(value, key) in baseFields"
              :key="key"
              class="flex flex-col w-full"
              :class="{ 'md:col-span-2': value.type === 'textarea' }"
            >
              <label class="font-semibold" :for="key">{{ value.label }}:</label>
              <input
                v-if="value.type !== 'textarea'"
                class="border rounded-lg p-2 mt-1 w-full dark:text-black"
                :value="key === 'configName' ? configName : config[key]"
                @input="
                  key === 'configName'
                    ? (configName = $event.target.value)
                    : (config[key] = $event.target.value)
                "
                :type="value.type"
                :id="key"
                required
                :placeholder="value.placeholder"
              />
              <textarea
                v-else
                class="border rounded-lg p-2 mt-1 w-full dark:text-black"
                v-model="config[key]"
                :id="key"
                required
                :placeholder="value.placeholder"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 2">
          <h3 class="text-xl font-semibold mb-4">Avantages</h3>
          <div class="space-y-4">
            <div class="flex flex-col space-y-2">
              <input
                v-model="newAdvantage.title"
                placeholder="Titre"
                class="border rounded-lg p-2 w-full dark:text-black"
              />
              <input
                v-model="newAdvantage.text"
                placeholder="Contenu"
                class="border rounded-lg p-2 w-full dark:text-black"
              />
              <button
                @click.prevent="addAdvantage"
                class="bg-green-500 text-white p-2 rounded-lg"
              >
                Ajouter
              </button>
            </div>
            <p>Nombre d'avantages ajoutés : {{ config.advantages.length }}</p>
            <div
              v-for="(advantage, index) in config.advantages"
              :key="index"
              class="flex items-center"
            >
              <p>{{ advantage.title }} - {{ advantage.text }}</p>
              <button
                class="text-red-500 p-2 rounded-lg"
                @click.prevent="removeAdvantage(index)"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 3">
          <h3 class="text-xl font-semibold mb-4">Tarifs</h3>
          <div class="space-y-4">
            <div class="flex flex-col space-y-2">
              <input
                v-model="newPricing.title"
                placeholder="Titre"
                class="border rounded-lg p-2 w-full dark:text-black"
              />
              <input
                v-model.number="newPricing.price"
                type="number"
                step="0.01"
                placeholder="Prix"
                class="border rounded-lg p-2 w-full dark:text-black"
              />
              <input
                v-model="newPricing.duration"
                placeholder="Durée (ex: mois, jour)"
                class="border rounded-lg p-2 w-full dark:text-black"
              />
              <input
                v-model="newFeature"
                placeholder="Caractéristique"
                class="border rounded-lg p-2 w-full dark:text-black"
              />
              <div class="flex justify-between">
                <button
                  @click.prevent="addFeature"
                  class="bg-green-500 text-white p-2 rounded-lg"
                >
                  Ajouter caractéristique
                </button>
                <button
                  @click.prevent="addPricing"
                  class="bg-blue-500 text-white p-2 rounded-lg"
                >
                  Ajouter tarif
                </button>
              </div>
            </div>
            <p>Nombre de tarifs ajoutés : {{ config.pricing.length }}</p>
            <div
              v-for="(pricing, index) in config.pricing"
              :key="index"
              class="flex items-center"
            >
              <p>
                {{ pricing.title }} - {{ pricing.price }} -
                {{ pricing.duration }} - {{ pricing.features }}
              </p>
              <button
                class="text-red-500 p-2 rounded-lg"
                @click.prevent="removePricing(index)"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 4">
          <h3 class="text-xl font-semibold mb-4">Témoignages</h3>
          <div class="space-y-4">
            <div class="flex flex-col space-y-2">
              <input
                v-model="newTestimonial.author"
                placeholder="Auteur"
                class="border rounded-lg p-2 w-full dark:text-black"
              />
              <textarea
                v-model="newTestimonial.text"
                placeholder="Texte du témoignage"
                class="border rounded-lg p-2 w-full dark:text-black"
              ></textarea>
              <input
                v-model.number="newTestimonial.stars"
                type="number"
                min="1"
                max="5"
                placeholder="Nombre d'étoiles (1-5)"
                class="border rounded-lg p-2 w-full dark:text-black"
              />
              <button
                @click.prevent="addTestimonial"
                class="bg-green-500 text-white p-2 rounded-lg"
              >
                Ajouter témoignage
              </button>
            </div>
            <p>
              Nombre de témoignages ajoutés : {{ config.testimonials.length }}
            </p>
            <div
              v-for="(testimonial, index) in config.testimonials"
              :key="index"
              class="flex items-center"
            >
              <p>
                {{ testimonial.author }} : {{ testimonial.text }} -
                {{ testimonial.stars }}/5
              </p>
              <button
                class="text-red-500 p-2 rounded-lg"
                @click.prevent="removeTestimonial(index)"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <div class="absolute bottom-0 right-0 flex justify-end space-x-2 p-4">
          <button
            v-if="currentStep > 1"
            @click.prevent="currentStep--"
            class="bg-gray-500 text-white p-2 rounded-lg"
          >
            Précédent
          </button>
          <button
            v-if="currentStep < 4"
            @click.prevent="currentStep++"
            class="bg-blue-500 text-white p-2 rounded-lg ml-2"
          >
            Suivant
          </button>
          <button
            v-if="currentStep === 4"
            type="submit"
            class="bg-green-700 text-white p-2 rounded-lg ml-2"
          >
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
      newAdvantage: {
        title: "",
        text: "",
      },
      baseFields: {
        configName: {
          label: "Nom de la configuration",
          type: "text",
          placeholder: "Ma configuration",
        },
        appName: {
          label: "Nom de l'application",
          type: "text",
          placeholder: "Mon application",
        },
        titleHero: {
          label: "Titre Hero",
          type: "text",
          placeholder: "Mon titre",
        },
        color: { label: "Couleur", type: "text", placeholder: "green" },
        imgHero: {
          label: "Image Hero",
          type: "text",
          placeholder: "https://...",
        },
        imgArg: {
          label: "Image Arguments",
          type: "text",
          placeholder: "https://...",
        },
        descriptionHero: {
          label: "Description Hero",
          type: "textarea",
          placeholder: "Description de ma super application...",
        },
      },
      newPricing: {
        title: "",
        price: null,
        duration: "",
        features: [],
      },
      newFeature: "",
      newTestimonial: {
        author: "",
        text: "",
        stars: 5,
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const newConfig = {
          ...this.config,
          createdAt: new Date().toISOString(),
        };

        const result = await $fetch("/api/saveConfig", {
          method: "POST",
          body: { userId: this.userId, configName: this.configName, config: newConfig },
        });
        if (result.error) {
          throw new Error(result.error);
        }
        alert(result.message);
        this.$router.push({ path: '/', query: { userId: this.userId } });
      } catch (error) {
        console.error("Erreur lors de la soumission du formulaire:", error);
        alert("Erreur lors de la soumission du formulaire: " + error.message);
      }
    },
    resetForm() {
      this.configName = "";
      Object.keys(this.config).forEach((key) => {
        if (Array.isArray(this.config[key])) {
          this.config[key] = [];
        } else {
          this.config[key] = "";
        }
      });
    },
    addAdvantage() {
      if (this.newAdvantage.title && this.newAdvantage.text) {
        this.config.advantages.push({ ...this.newAdvantage });
        this.newAdvantage.title = "";
        this.newAdvantage.text = "";
      }
    },
    removeAdvantage(index) {
      this.config.advantages.splice(index, 1);
    },
    addFeature() {
      if (this.newFeature.trim()) {
        this.newPricing.features.push(this.newFeature.trim());
        this.newFeature = "";
      }
    },
    removeFeature(index) {
      this.newPricing.features.splice(index, 1);
    },
    addPricing() {
      if (this.newPricing.title && this.newPricing.price !== null) {
        this.config.pricing.push({ ...this.newPricing });
        this.newPricing = {
          title: "",
          price: null,
          duration: "",
          features: [],
        };
      }
    },
    removePricing(index) {
      this.config.pricing.splice(index, 1);
    },
    addTestimonial() {
      if (this.newTestimonial.author && this.newTestimonial.text) {
        this.config.testimonials.push({ ...this.newTestimonial });
        this.newTestimonial = {
          author: "",
          text: "",
          stars: 5,
        };
      }
    },
    removeTestimonial(index) {
      this.config.testimonials.splice(index, 1);
    },
  },
};
</script>
