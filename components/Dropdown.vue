<template>
  <div class="relative inline-block w-full">
    <Button @click.prevent="toggleDropdown" :level="4" class="w-full">
      {{ selectedOption?.label || label }}
      <svg
        class="w-2.5 h-2.5 ms-3 transform transition-transform"
        :class="{ 'rotate-180': open }"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </Button>
    <div
      v-if="open"
      class="z-10 h-52 overflow-scroll absolute bg-white divide-y divide-gray-100 dark:divide-gray-700 rounded-lg shadow w-full dark:bg-gray-700"
      @keydown.arrow-down="moveFocus('down')"
      @keydown.arrow-up="moveFocus('up')"
      @keydown.enter="selectFocusedOption"
    >
      <input
        v-if="isFiltrable"
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher..."
        class="w-full p-2 border dark:border-slate-700 rounded-t-lg dark:bg-gray-600 dark:text-white dark:focus:bg-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          tabindex="0"
          @click="selectOption(option)"
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          ref="option"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    label: { type: String, default: "Select" },
    options: { type: Array, default: () => [] },
    modelValue: { type: [String, Number], default: "" },
    isOpen: { type: Boolean, default: false },
    isFiltrable: { type: Boolean, default: false },
  },
  data() {
    return {
      open: this.isOpen,
      searchQuery: "",
      focusIndex: 0,
    };
  },
  watch: {
    isOpen(newValue) {
      this.open = newValue;
    },
  },
  computed: {
    selectedOption() {
      return this.options.find((option) => option.value === this.modelValue);
    },
    filteredOptions() {
      return this.options.filter((option) =>
        option.label.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },
  methods: {
    toggleDropdown() {
      if (this.open) {
        this.$emit("close");
      } else {
        this.$emit("open");
      }
      this.open = !this.open;
    },
    selectOption(option) {
      this.$emit("update:modelValue", option.value);
      this.open = false;
      this.$emit("close");
    },
    selectFocusedOption() {
      const option = this.filteredOptions[this.focusIndex];
      if (option) {
        this.selectOption(option);
      }
      this.searchQuery = "";
    },
    moveFocus(direction) {
      if (this.filteredOptions.length === 0) return;
      if (direction === "down") {
        this.focusIndex = (this.focusIndex + 1) % this.filteredOptions.length;
      } else if (direction === "up") {
        this.focusIndex =
          (this.focusIndex - 1 + this.filteredOptions.length) %
          this.filteredOptions.length;
      }
      this.$nextTick(() => {
        const focusedItem = this.$refs.option[this.focusIndex];
        if (focusedItem) {
          focusedItem.focus();
        }
      });
    },
  },
};
</script>
