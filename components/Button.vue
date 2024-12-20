<template>
  <button :class="buttonClasses" :disabled="isDisabled" :title="title ? title : label">
    {{ label }}
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: {
      type: String,
      default: ""
    },
    title: { type: String, default: "" },
    level: {
      type: Number,
      default: 1
    },
    size: {
      type: String,
      default: "md",
      validator: (v) => ["", "sm", "md", "lg", "xl"].includes(v)
    },
    isDisabled: { type: Boolean, default: false }
  },
  computed: {
    buttonClasses() {
      const levelClasses = {
        1: "bg-gray-800 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-100",
        2: "bg-red-600 hover:bg-red-700 text-white",
        3: "bg-gray-300 text-black",
        4: "border dark:border-none bg-white dark:bg-gray-600 dark:hover:bg-gray-700 shadow hover:shadow-none transition-all duration-300",
        5: "text-gray-700 hover:text-black dark:text-white dark:hover:text-gray-300",
        6: "flex justify-between items-center w-full hover:bg-white dark:hover:bg-slate-900 rounded-lg text-blue-600 dark:text-blue-100",
        7: "flex justify-between items-center text-red-600 dark:text-red-100 hover:bg-white dark:hover:bg-slate-900 p-2 w-full rounded-lg cursor-pointer",
      };
      const sizeClasses = {
        sm: "p-1 min-w-24 text-sm",
        md: "p-2 min-w-32",
        lg: "p-3 min-w-40",
        xl: "p-4 min-w-48 text-lg"
      };
      return `${levelClasses[this.level]} ${sizeClasses[this.size]} flex justify-center items-center rounded-lg`;
    }
  }
}
</script>
