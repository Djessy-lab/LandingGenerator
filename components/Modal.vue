<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @keydown.esc="close"
    tabindex="0"
    @click.self="close"
    style="z-index: 9999;"
  >
    <div :class="modalSizeClass" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-scroll mx-auto">
      <div class="flex justify-between">
        <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
        <button v-if="closeButton" class="h-5 w-5" @click="close">
          <Icon
            name="line-md:close"
            class="text-gray-600 dark:text-white h-5 w-5"
          />
        </button>
      </div>
      <p v-if="!$slots.default">{{ content }}</p>
      <slot />
      <div class="mt-12 flex justify-end space-x-2" v-if="buttons.length">
        <Button
          v-for="(button, index) in buttons"
          :key="index"
          :label="button.text"
          :level="getButtonLevel(button.type)"
          @click="button.click"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: "Titre de la modale" },
    content: { type: String, default: "Contenu de la modale" },
    buttons: { type: Array, default: () => [] },
    closeButton: { type: Boolean, default: true },
    size: { type: String, default: "md" },
  },
  computed: {
    modalSizeClass() {
      const sizeClasses = {
        sm: { width: 'w-[30%]', height: 'max-h-[60vh]' },
        md: { width: 'w-[50%]', height: 'max-h-[80vh]' },
        lg: { width: 'w-[70%]', height: 'max-h-[90vh]' },
        xl: { width: 'w-[90%]', height: 'max-h-[95vh]' },
      };

      const { width, height } = sizeClasses[this.size] || sizeClasses.md;
      return `${width} ${height}`;
    },
  },
  methods: {
    getButtonLevel(type) {
      if (type === "confirm") return 1;
      if (type === "cancel") return 3;
      if (type === "delete") return 2;
      return 1;
    },
    close() {
      this.$emit("update:modelValue", false);
    },
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
};
</script>
