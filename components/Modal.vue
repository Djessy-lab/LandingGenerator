<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[40%] max-lg:w-[90%] min-h-52 mx-auto">
      <div class="flex justify-between">
        <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
        <button v-if="closeButton" class="h-5 w-5" @click="close">
          <Icon
            name="line-md:close"
            class="text-gray-600 dark:text-white h-5 w-5"
          />
        </button>
      </div>
      <p>{{ content }}</p>
      <div class="mt-12 flex justify-end space-x-2" v-if="buttons.length">
        <button
          v-for="(button, index) in buttons"
          :key="index"
          :class="buttonClasses(button)"
          @click="button.click"
        >
          {{ button.text }}
        </button>
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
  },
  methods: {
    buttonClasses(button) {
      const baseClasses = "p-2 rounded-lg";
      const color =
        button.type === "confirm"
          ? "bg-green-600 text-white"
          : button.type === "cancel"
            ? "bg-gray-300 text-black"
            : button.type === "delete"
              ? "bg-red-600 text-white"
              : "bg-black text-white";

      return [baseClasses, color].join(" ");
    },
    close() {
      this.$emit("update:modelValue", false);
    },
  },
};
</script>
