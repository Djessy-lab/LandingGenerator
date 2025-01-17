<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">Avantages</h3>
    <div class="space-y-4">
      <div class="flex flex-col space-y-2">
        <input v-model="newAdvantage.title" placeholder="Titre" class="border rounded-lg p-2 w-full dark:text-black" />
        <input v-model="newAdvantage.text" placeholder="Contenu" class="border rounded-lg p-2 w-full dark:text-black" />
        <Button :level="4" @click.prevent="addAdvantage"
          class="w-full">
          Ajouter
          <Icon name="line-md:plus" class="h-5 w-5 ml-2" />
        </Button>
      </div>
      <div class="mb-4 flex items-center">
        <p class="text-lg font-prompt" v-if="advantages.length">Nombre d'avantages ajoutés : {{ advantages.length }}</p>
        <button class="ml-5" v-if="advantages.length" @click.prevent="seeAdvantages = !seeAdvantages">
          <Icon v-if="!seeAdvantages" name="line-md:chevron-down" class="h-5 w-5 dark:text-blue-100" />
          <Icon v-else name="line-md:chevron-up" class="h-5 w-5 dark:text-blue-100" />
        </button>
      </div>
      <div v-if="advantages.length"
        :class="[seeAdvantages ? '' : 'h-10', 'rounded-lg p-4 w-[72%] max-lg:max-h-96 transition-all duration-500 ease-in-out']">

        <draggable v-if="seeAdvantages"
          :list="localAdvantages"
          @change="onDragEnd"
          item-key="id"
          :animation="200"
          ghost-class="ghost-card"
          drag-class="dragging-card"
          class="flex flex-col">
          <template #item="{ element, index }">
            <div class="flex items-center">
              <div
                class="border shadow rounded-lg p-2 w-full dark:border-none dark:bg-gray-900 dark:text-gray-200 mb-2 relative cursor-move bg-white transition-transform duration-200 hover:scale-[1.02]">
                <button title="Supprimer" class="absolute top-0 right-0 p-2" @click.prevent="removeAdvantage(index)">
                  <Icon name="line-md:close" class="h-4 w-4" />
                </button>
                <p><span class="font-semibold">Titre : </span>{{ element.title }}</p>
                <p class="break-all"><span class="font-semibold">Texte : </span>{{ element.text }}</p>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "Step2",
  components: {
    draggable
  },
  props: {
    advantages: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newAdvantage: {
        id: '',
        title: "",
        text: "",
      },
      seeAdvantages: false,
      localAdvantages: [],
    };
  },
  watch: {
    advantages: {
      handler(newVal) {
        this.localAdvantages = [...newVal];
      },
      immediate: true
    }
  },
  methods: {
    addAdvantage() {
      if (this.newAdvantage.title && this.newAdvantage.text) {
        const newAdvantageWithId = {
          ...this.newAdvantage,
          id: crypto.randomUUID()
        };
        this.$emit('updateAdvantages', [...this.advantages, newAdvantageWithId]);
        this.newAdvantage.title = "";
        this.newAdvantage.text = "";
      }
    },
    removeAdvantage(index) {
      const updatedAdvantages = [...this.localAdvantages];
      updatedAdvantages.splice(index, 1);
      this.$emit('updateAdvantages', updatedAdvantages);
    },
    onDragEnd(event) {
      this.$emit('updateAdvantages', [...this.localAdvantages]);
    }
  },
};
</script>

<style scoped>
.ghost-card {
  @apply opacity-50 bg-blue-50 border-2 border-blue-200;
}

.dragging-card {
  @apply shadow-lg scale-[1.02] rotate-1;
}
</style>
