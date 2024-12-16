<template>
  <div class="flex items-center">
    <label
      for="theme-toggle"
      tabindex="0"
      class="flex items-center cursor-pointer"
      @keydown.space.prevent="toggleColorMode"
      @keydown.enter.prevent="toggleColorMode"
    >
      <div class="relative">
        <input
          type="checkbox"
          id="theme-toggle"
          class="sr-only"
          :checked="isDarkMode"
          @change="toggleColorMode"
        />
        <div
          :class="[
            'toggle-bg',
            toggleSize.bg,
            'bg-gray-300 rounded-full shadow-inner transition-colors duration-700 ease-in-out dark:bg-gray-600',
          ]"
        ></div>
        <div
          :class="[
            'dot',
            toggleSize.dot,
            'absolute bg-white rounded-full shadow flex items-center justify-center transition-all duration-1000 ease-in-out',
            isDarkMode ? toggleSize.translateDark : toggleSize.translateLight,
          ]"
        >
          <Icon
            :name="iconName"
            :class="[
              'transition-all duration-1000 ease-in-out',
              iconSize,
              isDarkMode
                ? 'text-yellow-300 rotate-[360deg] scale-110'
                : 'text-orange-400 rotate-0 scale-100',
            ]"
          />
        </div>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: "ThemeToggle",
  props: {
    size: {
      type: String,
      default: "md",
      validator: (value) => ["sm", "md", "lg"].includes(value),
    },
  },
  data() {
    return {
      colorMode: null,
    };
  },
  mounted() {
    this.colorMode = useColorMode();
  },
  watch: {
    colorMode: {
      deep: true,
      immediate: true,
      handler(newValue) {
        this.colorMode = newValue;
        this.iconName;
      },
    },
  },
  computed: {
    isDarkMode() {
      return this.colorMode ? this.colorMode.value === "dark" : false;
    },
    iconName() {
      if (!this.colorMode) return "line-md:moon-alt-to-sunny-outline-loop-transition";
      return this.colorMode.value === "dark"
        ? "line-md:sunny-filled-loop-to-moon-filled-loop-transition"
        : "line-md:moon-alt-to-sunny-outline-loop-transition";
    },
    toggleSize() {
      switch (this.size) {
        case "sm":
          return {
            bg: "w-12 h-6",
            dot: "w-5 h-5 top-0.5 left-0.5",
            translateDark: "translate-x-6",
            translateLight: "translate-x-0",
          };
        case "lg":
          return {
            bg: "w-20 h-10",
            dot: "w-8 h-8 top-1 left-1",
            translateDark: "translate-x-10",
            translateLight: "translate-x-0",
          };
        default:
          return {
            bg: "w-14 h-8",
            dot: "w-6 h-6 top-1 left-1",
            translateDark: "translate-x-6",
            translateLight: "translate-x-0",
          };
      }
    },
    iconSize() {
      switch (this.size) {
        case "sm":
          return "w-3 h-3";
        case "lg":
          return "w-6 h-6";
        default:
          return "w-5 h-5";
      }
    },
  },
  methods: {
    toggleColorMode() {
      if (!this.colorMode) return;
      this.colorMode.preference =
        this.colorMode.value === "dark" ? "light" : "dark";
    },
  },
};
</script>

<style scoped>
.toggle-bg {
  transition: background-color 0.7s ease-in-out;
}

.dot {
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.dot:hover {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
}
</style>
