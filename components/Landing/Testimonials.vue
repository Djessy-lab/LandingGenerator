<template>
  <div>
    <section
      id="testimonials"
      :class="colorMode.value === 'dark' ? 'bg-gray-800 shadow-inner' : 'bg-gray-100 shadow-inner'"
      class="py-12"
    >
      <h2
        class="text-3xl font-bold text-center"
        :class="colorMode.value === 'dark' ? 'text-white' : 'text-gray-900'"
      >
        Ce que disent nos utilisateurs
      </h2>
      <div class="max-w-4xl mx-auto mt-8">
        <div class="flex flex-wrap justify-center">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            :class="[
              `w-96 p-4 rounded-lg shadow-lg m-4 flex flex-col justify-between`,
              colorMode.value === 'dark' ? 'bg-gray-700 text-white' : 'bg-white',
            ]"
          >
            <p
              :class="colorMode.value === 'dark' ? 'text-gray-200' : 'text-gray-600'"
              class="h-40 max-h-40 overflow-scroll"
            >
              {{ testimonial.text }}
            </p>
            <div class="flex justify-between items-center mt-4">
              <div class="flex">
                <img
                  v-for="(star, starIndex) in testimonial.stars"
                  :key="starIndex"
                  src="/img/stars.png"
                  alt="stars"
                  class="w-6"
                />
              </div>
              <p
                :class="colorMode.value === 'dark' ? 'text-gray-200' : 'text-gray-900'"
                class="font-bold"
              >
                - {{ testimonial.author }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Testimonials",
  setup() {
    const colorMode = useColorMode();
    return { colorMode };
  },
  props: {
    testimonials: { type: Array, default: () => [] },
  },
};
</script>
