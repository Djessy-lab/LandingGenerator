<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">Témoignages</h3>
    <div class="space-y-4">
      <div class="flex flex-col space-y-2">
        <input v-model="newTestimonial.author" placeholder="Auteur" class="border rounded-lg p-2 w-full dark:text-black" />
        <textarea v-model="newTestimonial.text" placeholder="Contenu" class="border rounded-lg p-2 w-full dark:text-black"></textarea>
        <input v-model.number="newTestimonial.stars" type="number" min="1" max="5" placeholder="Nombre d'étoiles (1-5)"
        class="border rounded-lg p-2 w-full dark:text-black" />
        <Button :level="4" @click.prevent="addTestimonial">
          Ajouter
          <Icon name="line-md:plus" class="h-5 w-5 ml-2" />
        </Button>
      </div>
      <div class="mb-4 flex items-center">
        <p class="text-lg font-prompt" v-if="testimonials.length">Nombre de témoignages ajoutés : {{ testimonials.length }}</p>
        <button v-if="testimonials.length" class="ml-5" @click.prevent="seeTestimonials = !seeTestimonials">
          <Icon v-if="!seeTestimonials" name="line-md:chevron-down" class="h-5 w-5 dark:text-blue-100" />
          <Icon v-else name="line-md:chevron-up" class="h-5 w-5 dark:text-blue-100" />
        </button>
      </div>
      <div v-if="testimonials.length"
        :class="[seeTestimonials ? '' : 'h-10', 'rounded-lg p-2 w-[72%] max-lg:max-h-96 overflow-auto transition-all duration-500 ease-in-out']">
        <draggable v-if="seeTestimonials"
          :list="localTestimonials"
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
                <button title="Supprimer" class="absolute top-0 right-0 p-2" @click.prevent="removeTestimonial(index)">
                  <Icon name="line-md:close" class="h-4 w-4" />
                </button>
                <p><span class="font-semibold">Auteur : </span>{{ element.author }}</p>
                <p><span class="font-semibold">Contenu : </span>{{ element.text }}</p>
                <p><span class="font-semibold">Note : </span>{{ element.stars }}/5</p>
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
  name: "Step4",
  components: {
    draggable
  },
  props: {
    testimonials: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newTestimonial: {
        id: '',
        author: "",
        text: "",
        stars: null,
      },
      seeTestimonials: false,
      localTestimonials: [],
    };
  },
  watch: {
    testimonials: {
      handler(newVal) {
        this.localTestimonials = [...newVal];
      },
      immediate: true
    }
  },
  methods: {
    addTestimonial() {
      if (this.newTestimonial.author && this.newTestimonial.text) {
        const newTestimonialWithId = {
          ...this.newTestimonial,
          id: crypto.randomUUID()
        };
        this.$emit('update-testimonials', [...this.testimonials, newTestimonialWithId]);
        this.newTestimonial = {
          id: '',
          author: "",
          text: "",
        };
      }
    },
    removeTestimonial(index) {
      const updatedTestimonials = [...this.localTestimonials];
      updatedTestimonials.splice(index, 1);
      this.$emit('update-testimonials', updatedTestimonials);
    },
    onDragEnd(event) {
      this.$emit('update-testimonials', [...this.localTestimonials]);
    }
  },
};
</script>

<style scoped>
.ghost-card {
  opacity: 0.5;
  background-color: #ebf8ff;
  border-width: 2px;
  border-color: #bfdbfe;
}

.dragging-card {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: scale(1.02) rotate(1deg);
}
</style>
