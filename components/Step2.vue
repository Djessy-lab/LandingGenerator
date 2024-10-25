<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">Avantages</h3>
    <div class="space-y-4">
      <div class="flex flex-col space-y-2">
        <input v-model="newAdvantage.title" placeholder="Titre" class="border rounded-lg p-2 w-full dark:text-black" />
        <input v-model="newAdvantage.text" placeholder="Contenu" class="border rounded-lg p-2 w-full dark:text-black" />
        <button @click.prevent="addAdvantage"
          class="border dark:border-none bg-white dark:bg-gray-600 dark:hover:bg-gray-700 shadow hover:shadow-none transition-all duration-300 p-2 rounded-lg flex items-center justify-center">
          Ajouter
          <Icon name="line-md:plus" class="h-5 w-5 ml-2" />
        </button>
      </div>
      <div class="mb-4 flex items-center">
        <p class="text-lg font-prompt" v-if="advantages.length">Nombre d'avantages ajoutés : {{ advantages.length }}</p>
        <button class="ml-5" v-if="advantages.length" @click.prevent="seeAdvantages = !seeAdvantages">
          <Icon v-if="!seeAdvantages" name="line-md:chevron-down" class="h-5 w-5 dark:text-blue-100" />
          <Icon v-else name="line-md:chevron-up" class="h-5 w-5 dark:text-blue-100" />
        </button>
      </div>
      <div v-if="advantages.length"
        :class="[seeAdvantages ? 'h-52' : 'h-10', 'rounded-lg p-4 w-[72%] max-h-52 max-lg:max-h-96 overflow-auto transition-all duration-500 ease-in-out']">

        <div v-if="seeAdvantages" v-for="(advantage, index) in advantages" :key="index" class="flex items-center">
          <div
            class="border shadow rounded-lg p-2 w-full dark:border-none dark:bg-gray-900 dark:text-gray-200 mb-2 relative">
            <button title="Supprimer" class="absolute top-0 right-0 p-2" @click.prevent="removeAdvantage(index)">
              <Icon name="line-md:close" class="h-4 w-4" />
            </button>
            <p><span class="font-semibold">Titre : </span>{{ advantage.title }}</p>
            <p class="break-all"><span class="font-semibold">Texte : </span>{{ advantage.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step2",
  props: {
    advantages: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newAdvantage: {
        title: "",
        text: "",
      },
      seeAdvantages: false,
    };
  },
  methods: {
    addAdvantage() {
      if (this.newAdvantage.title && this.newAdvantage.text) {
        this.$emit('updateAdvantages', [...this.advantages, { ...this.newAdvantage }]);
        this.newAdvantage.title = "";
        this.newAdvantage.text = "";
      }
    },
    removeAdvantage(index) {
      const updatedAdvantages = [...this.advantages];
      updatedAdvantages.splice(index, 1);
      this.$emit('updateAdvantages', updatedAdvantages);
    },
  },
};
</script>
