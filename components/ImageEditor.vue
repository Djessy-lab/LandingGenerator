<template>
  <div>
    <Button label="Ajouter une image" :level="4" @click.prevent="openModal = true" />
    <Modal v-if="openModal" :modelValue="openModal" @update:modelValue="openModal = false" title="Ajouter une image"
      size="xl">
      <div class="flex">
        <div class="flex flex-col w-[50%]">
          <FileUpload label="Ajouter une image" :initialFile="localFile" @file-selected="handleFileSelection" />
          <div class="flex space-x-4 mt-4">
            <div class="flex items-center">
              <input type="checkbox" id="shadow-option" v-model="localShadow" />
              <label for="shadow-option" class="ml-2">Ajouter une ombre</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="rounded-option" v-model="localRounded" />
              <label for="rounded-option" class="ml-2">Arrondir les coins</label>
            </div>
            <div class="flex flex-col w-full">
              <label for="object-fit" class="mb-1">Object Fit</label>
              <select id="object-fit" v-model="localObjectFit" class="w-full border rounded px-2 py-1">
                <option v-for="fit in objectFitOptions" :key="fit" :value="fit">
                  {{ fit }}
                </option>
              </select>
            </div>
            <div class="flex flex-col w-full">
              <label for="object-position" class="mb-1">Object Position</label>
              <select id="object-position" v-model="localObjectPosition" class="w-full border rounded px-2 py-1">
                <option v-for="position in objectPositionOptions" :key="position" :value="position">
                  {{ position }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="w-[50%] h-96 p-10">
          <img v-if="localFile && localFile.url" :src="localFile.url" :class="imageClass" />
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <Button label="Enregistrer" :level="1" @click.prevent="save" />
        <Button label="Annuler" :level="3" class="ml-4" @click.prevent="closeModal" />
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "ImageEditor",
  emits: ["save", "close"],
  props: {
    initialFile: {
      type: Object,
      default: null,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    objectPosition: {
      type: String,
      default: 'center',
    },
    objectFit: {
      type: String,
      default: 'contain',
    },
  },
  data() {
    return {
      openModal: false,
      localFile: this.initialFile ? { ...this.initialFile, url: this.initialFile.url || URL.createObjectURL(this.initialFile) } : null,
      localShadow: this.shadow,
      localRounded: this.rounded,
      localObjectFit: this.objectFit,
      localObjectPosition: this.objectPosition,
      objectPositions: ['object-center', 'object-top', 'object-bottom', 'object-left', 'object-right', 'object-left-top', 'object-right-top', 'object-left-bottom', 'object-right-bottom'],
      objectFits: ['object-cover', 'object-contain', 'object-fill', 'object-none', 'object-scale-down'],
    };
  },
  computed: {
    imageClass() {
      let classes = `object-${this.localObjectFit} object-${this.localObjectPosition} w-full h-full`;
      if (this.localShadow) classes += " shadow-lg";
      if (this.localRounded) classes += " rounded-2xl";
      return classes;
    },
    objectPositionOptions() {
      return this.objectPositions.map(object => object.replace('object-', ''));
    },
    objectFitOptions() {
      return this.objectFits.map(object => object.replace('object-', ''));
    },
  },
  methods: {
    handleFileSelection(fileData) {
  if (fileData.file) {
    this.localFile = { ...fileData, url: URL.createObjectURL(fileData.file) };

    this.$emit('file-selected', {
      file: fileData.file,
      options: {
        shadow: this.localShadow,
        rounded: this.localRounded,
        position: this.localObjectPosition,
        fit: this.localObjectFit
      }
    });
  } else {
    this.localFile = null;
  }
},
    save() {
      this.$emit("save", {
        file: this.localFile,
        shadow: this.localShadow,
        rounded: this.localRounded,
        position: this.localObjectPosition,
        fit: this.localObjectFit,
      });
      this.closeModal();
    },
    closeModal() {
      this.openModal = false;
      this.$emit("close");
    },
  },
};
</script>
