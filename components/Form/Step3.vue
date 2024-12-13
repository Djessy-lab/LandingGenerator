<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">Tarifs</h3>
    <div class="space-y-4">
      <div class="flex flex-col space-y-2">
        <input v-model="newPricing.title" placeholder="Titre" class="border rounded-lg p-2 w-full dark:text-black" />
        <div class="flex gap-2">
          <input v-model.number="newPricing.price" type="number" step="0.01" placeholder="Prix"
            class="border rounded-lg p-2 w-full dark:text-black" />
          <input v-model="newPricing.duration" placeholder="Durée (ex: mois, jour)"
            class="border rounded-lg p-2 w-full dark:text-black" />
        </div>
        <input v-model="newFeature" placeholder="Caractéristique"
          class="border rounded-lg p-2 w-full dark:text-black" />
        <div class="flex justify-between">
          <Button :level="4" @click.prevent="addFeature"
            class="border dark:border-none bg-white dark:bg-gray-600 dark:hover:bg-gray-700 shadow hover:shadow-none transition-all duration-300  p-2 rounded-lg flex items-center justify-center">
            Ajouter caractéristique
            <Icon name="line-md:plus" />
          </Button>
          <Button :level="4" @click.prevent="addPricing"
            class="border dark:border-none shadow hover:shadow-none bg-white dark:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-300  p-2 rounded-lg flex items-center justify-center">
            Ajouter tarif
            <Icon name="line-md:plus" />
          </Button>
        </div>
      </div>
      <div class="mb-4 flex items-center">
        <p v-if="pricing.length" class="text-lg font-prompt">Nombre de tarifs ajoutés : {{ pricing.length }}</p>
        <button v-if="pricing.length" class="ml-5" @click.prevent="seePrices = !seePrices">
          <Icon v-if="!seePrices" name="line-md:chevron-down" class="h-5 w-5 dark:text-blue-100" />
          <Icon v-else name="line-md:chevron-up" class="h-5 w-5 dark:text-blue-100" />
        </button>
      </div>
      <div v-if="pricing.length"
        :class="[seePrices ? 'h-56' : 'h-10', 'rounded-lg p-2 w-[72%] max-h-56 max-lg:max-h-96 overflow-auto transition-all duration-500 ease-in-out']">

        <div v-if="seePrices" v-for="(price, index) in pricing" :key="index" class="flex items-center">
          <div
            class="border shadow rounded-lg p-2 w-full dark:border-none dark:bg-gray-900 dark:text-gray-200 mb-2 relative">
            <button title="Supprimer" class="absolute top-0 right-0 p-2" @click.prevent="removePricing(index)">
              <Icon name="line-md:close" class="h-4 w-4 " />
            </button>
            <p><span class="font-semibold">Titre : </span>{{ price.title }}</p>
            <p><span class="font-semibold">Prix : </span>{{ price.price }} €</p>
            <p><span class="font-semibold">Réccurence : </span>{{ price.duration }}</p>
            <p><span class="font-semibold">Fonctionnalitées : </span>{{ price.features.join(', ') }}</p>
          </div>
        </div>
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
      seePrices: false,
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
