<template>
  <div class="relative flex items-center" @dragenter.prevent="isDropping = true"
    @dragleave.prevent="isDropping = false">
    <input type="file" @change="handleFileUpload" class="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
    <div
      class="flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-gray-600  dark:text-gray-300 dark:border-slate-700 dark:hover:bg-gray-700"
      :class="isDropping ? 'bg-gray-100 dark:bg-gray-700 border' : ''">
      <Icon name="line-md:upload" class="h-6 w-6 mr-2" />
      <span>{{ label }}</span>
    </div>
  </div>
  <p class="text-xs text-gray-500 dark:text-gray-400">{{ fileName }}</p>
</template>

<script>
export default {
  name: "FileUpload",
  emits: ['file-selected'],
  data() {
    return {
      isDropping: false,
      fileName: ''
    };
  },
  props: {
    label: {
      type: String,
      default: "Sélectionner un fichier",
    },
  },
  methods: {
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        this.$emit("file-selected", { file, fileName: file.name });
      }
    },
  },
};
</script>
