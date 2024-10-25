<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">Tarifs</h3>
    <div class="space-y-4">
      <div class="flex flex-col space-y-2">
        <input v-model="newPricing.title" placeholder="Titre" class="border rounded-lg p-2 w-full dark:text-black" />
        <input v-model.number="newPricing.price" type="number" step="0.01" placeholder="Prix"
          class="border rounded-lg p-2 w-full dark:text-black" />
        <input v-model="newPricing.duration" placeholder="Durée (ex: mois, jour)"
          class="border rounded-lg p-2 w-full dark:text-black" />
        <input v-model="newFeature" placeholder="Caractéristique"
          class="border rounded-lg p-2 w-full dark:text-black" />
        <div class="flex justify-between">
          <button @click.prevent="addFeature"
            class="border dark:border-none bg-white dark:bg-gray-600 dark:hover:bg-gray-700 shadow hover:shadow-none transition-all duration-300  p-2 rounded-lg flex items-center justify-center">
            Ajouter caractéristique
            <Icon />
          </button>
          <button @click.prevent="addPricing"
            class="border dark:border-none shadow hover:shadow-none bg-white dark:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-300  p-2 rounded-lg flex items-center justify-center">
            Ajouter tarif
          </button>
        </div>
      </div>
      <p>Nombre de tarifs ajoutés : {{ pricing.length }}</p>
      <div v-for="(pricing, index) in pricing" :key="index" class="flex items-center">
        <p>
          {{ pricing.title }} - {{ pricing.price }} -
          {{ pricing.duration }} - {{ pricing.features.join(', ') }}
        </p>
        <button class="text-red-500 p-2 rounded-lg" @click.prevent="removePricing(index)">
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step3",
  props: {
    pricing: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newPricing: {
        title: "",
        price: null,
        duration: "",
        features: [],
      },
      newFeature: "",
    };
  },
  methods: {
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
        this.$emit('update-pricing', [...this.pricing, { ...this.newPricing }]);
        this.newPricing = {
          title: "",
          price: null,
          duration: "",
          features: [],
        };
      }
    },
    removePricing(index) {
      const updatedPricing = [...this.pricing];
      updatedPricing.splice(index, 1);
      this.$emit('update-pricing', updatedPricing);
    },
  },
};
</script>
