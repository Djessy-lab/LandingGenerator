<template>
  <div v-for="(toast, index) in toasts" :key="index">
    <Toast
      :modelValue="toast.isVisible"
      :title="toast.title"
      :message="toast.message"
      :type="toast.type"
      :duration="toast.duration"
    />
  </div>
</template>

<script>
export default {
  name: "ToastContainer",
  props: {
    toasts: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
