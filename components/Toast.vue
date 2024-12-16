<template>
  <div
    class="toast p-4 bg-white dark:bg-slate-700 rounded-xl shadow-md absolute bottom-3 right-4 z-10 w-full max-w-sm transition-transform duration-300"
    :class="{ 'translate-y-0': modelValue, 'translate-y-5 opacity-0': !modelValue }">
    <div class="absolute top-0 right-0 p-2">
      <button @click.prevent="closeToast">
        <Icon name="line-md:close" class="" />
      </button>
    </div>
    <div class="flex">
      <div class="mr-4">
        <Icon :name="iconName" :class="['h-5 w-5', iconColor]" />
      </div>
      <div>
        <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
        <p class="text-gray-700 dark:text-white">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: '' },
    message: { type: String, default: '' },
    type: { type: String, default: '' },
    duration: { type: Number, default: 3000 },
  },
  watch: {
    modelValue(newValue) {
      if (newValue) {
        setTimeout(this.closeToast, this.duration);
      }
    }
  },
  computed: {
    iconName() {
      const name = {
        success: 'clarity:success-standard-solid',
        error: 'ic:sharp-error',
        warning: 'carbon:warning-alt-filled',
        info: 'mdi:information-box',
      }
      return name[this.type] || 'mdi:information-box';
    },
    iconColor() {
      const color = {
        success: 'text-green-600',
        error: 'text-red-600',
        warning: 'text-yellow-400',
        info: 'text-blue-400',
      }
      return color[this.type] || 'text-blue-600';
    }
  },
  methods: {
    closeToast() {
      this.$emit('update:modelValue', false);
    },
  },
};
</script>
