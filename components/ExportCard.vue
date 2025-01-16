<template>
  <div class="w-full">
    <div class="flex justify-center my-10">
      <Icon
        name="material-symbols-light:download-2-outline"
        class="w-20 h-20 text-black dark:text-white"
      />
    </div>
    <Button @click="exportConfig" class="w-[60%] mb-4 mx-auto"
      >Exporter le code</Button
    >
  </div>
</template>

<script>
export default {
  name: "ExportCard",
  emits: ["exportConfig"],
  methods: {
    exportConfig() {
      this.$emit("exportConfig");
    },
  },
};
</script>
