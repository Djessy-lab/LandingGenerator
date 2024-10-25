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
      <p>
        Nombre de témoignages ajoutés : {{ testimonials.length }}
      </p>
      <div v-for="(testimonial, index) in testimonials" :key="index" class="flex items-center">
        <p>
          {{ testimonial.author }} : {{ testimonial.text }} -
          {{ testimonial.stars }}/5
        </p>
        <button class="text-red-500 p-2 rounded-lg" @click.prevent="removeTestimonial(index)">
          Supprimer
        </button>
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
