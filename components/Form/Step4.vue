<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">Témoignages</h3>
    <div class="space-y-4">
      <div class="flex flex-col space-y-2">
        <input v-model="newTestimonial.author" placeholder="Auteur"
          class="border rounded-lg p-2 w-full dark:text-black" />
        <textarea v-model="newTestimonial.text" placeholder="Texte du témoignage"
          class="border rounded-lg p-2 w-full dark:text-black"></textarea>
        <input v-model.number="newTestimonial.stars" type="number" min="1" max="5" placeholder="Nombre d'étoiles (1-5)"
          class="border rounded-lg p-2 w-full dark:text-black" />
        <button @click.prevent="addTestimonial"
          class="flex justify-center items-center border dark:border-none shadow hover:shadow-none bg-white dark:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-300 p-2 rounded-lg">
          Ajouter
          <Icon name="line-md:plus" class="h-5 w-5 ml-2" />
        </button>
      </div>
      <div class="mb-4 flex items-center">
        <p class="text-lg font-prompt" v-if="testimonials.length">Nombre de témoignages ajoutés : {{ testimonials.length }}</p>
        <button v-if="testimonials.length" class="ml-5" @click.prevent="seeTestimonials = !seeTestimonials">
          <Icon v-if="!seeTestimonials" name="line-md:chevron-down" class="h-5 w-5 dark:text-blue-100" />
          <Icon v-else name="line-md:chevron-up" class="h-5 w-5 dark:text-blue-100" />
        </button>
      </div>
      <div v-if="testimonials.length"
        :class="[seeTestimonials ? 'h-56' : 'h-10', 'rounded-lg p-2 w-[72%] max-h-56 max-lg:max-h-96 overflow-auto transition-all duration-500 ease-in-out']">

        <div v-if="seeTestimonials" v-for="(testimonial, index) in testimonials" :key="index" class="flex items-center">
          <div
            class="border shadow rounded-lg p-2 w-full dark:border-none dark:bg-gray-900 dark:text-gray-200 mb-2 relative">
            <button title="Supprimer" class="absolute top-0 right-0 p-2" @click.prevent="removeTestimonial(index)">
              <Icon name="line-md:close" class="h-4 w-4" />
            </button>
            <p><span class="font-semibold">Titre : </span>{{ testimonial.author }}</p>
            <p class="break-all"><span class="font-semibold">Texte : </span>{{ testimonial.text }}</p>
            <p><span class="font-semibold">Note : </span>{{ testimonial.stars }}/5</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step4",
  props: {
    testimonials: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newTestimonial: {
        author: "",
        text: "",
        stars: null,
      },
      seeTestimonials: false,
    };
  },
  methods: {
    addTestimonial() {
      if (this.newTestimonial.author && this.newTestimonial.text && this.newTestimonial.stars) {
        this.$emit('update-testimonials', [...this.testimonials, { ...this.newTestimonial }]);
        this.newTestimonial = {
          author: "",
          text: "",
          stars: null,
        };
      }
    },
    removeTestimonial(index) {
      const updatedTestimonials = [...this.testimonials];
      updatedTestimonials.splice(index, 1);
      this.$emit('update-testimonials', updatedTestimonials);
    },
  },
};
</script>
