<template>
  <input
    v-if="type !== 'textarea'"
    :id="label"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="inputClasses"
    :placeholder="placeholder"
    :type="type"
  />
  <textarea
    v-else
    :id="label"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="inputClasses"
    :placeholder="placeholder"
    rows="10"
  ></textarea>
</template>

<script>
export default {
  name: "CustomInput",
  emits: ["update:modelValue"],
  props: {
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    type: { type: String, default: "text" },
    modelValue: { type: String, default: "" },
  },
  computed: {
    inputClasses() {
      return `
      w-full
      bg-white
      dark:bg-slate-700
      placeholder:text-slate-400
      text-slate-700
      text-sm
      border
      dark:border-gray-600
      border-slate-200
      rounded-lg
      px-3
      py-3
      transition
      duration-300
      ease
      focus:outline-none
      focus:border-slate-400
      dark:focus:border-slate-100
      hover:border-slate-300
      dark:hover:border-slate-500
      shadow-sm
      focus:shadow`;
    },
  },
};
</script>
