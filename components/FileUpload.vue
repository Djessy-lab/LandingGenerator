<template>
  <div class="relative flex items-center" @dragover.prevent="isDropping = true" @dragleave.prevent="isDropping = false">
    <input type="file" @change="handleFileUpload" class="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
    <div
      class="flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-gray-600  dark:text-gray-300 dark:border-slate-700 dark:hover:bg-gray-700"
      :class="isDropping ? 'bg-gray-100 dark:bg-gray-700 border' : ''">
      <Icon name="line-md:upload" class="h-6 w-6 mr-2" />
      <span>{{ label }}</span>
    </div>
  </div>
  <div class="flex mt-2" v-if="file">
    <p class="text-xs text-gray-500 dark:text-gray-400">{{ file.name || file.fileName }}</p>
    <Icon name="line-md:remove" class="h-4 w-4 ml-2 cursor-pointer" @click.prevent="removeFile" />
  </div>
</template>

<script>
export default {
  name: "FileUpload",
  emits: ['file-selected'],
  data() {
    return {
      isDropping: false,
      fileName: '',
      file: this.initialFile || null
    };
  },
  props: {
    label: {
      type: String,
      default: "Sélectionner un fichier",
    },
    initialFile: {
      type: Object,
      default: null
    }
  },
  watch: {
    initialFile(newFile) {
      this.file = newFile;
      this.fileName = newFile ? newFile.name : '';
    }
  },
  methods: {
    async handleFileUpload(event) {
      this.isDropping = false;
      const newFile = event.target.files[0];
      if (newFile) {
        this.file = newFile;
        this.fileName = newFile.name;
        this.$emit("file-selected", { file: this.file, fileName: this.file.name });
      }
    },
    removeFile() {
      this.file = null;
      this.fileName = '';
      this.$emit("file-selected", { file: null, fileName: '' });
    }
  },
};
</script>
