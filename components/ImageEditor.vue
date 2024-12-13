<template>
  <Button :title="localFile?.name" :label="buttonLabel" :level="4" @click.prevent="openModal = true" />
  <Modal v-if="openModal" :modelValue="openModal" title="Éditer une image" size="xl" @update:modelValue="closeModal"
    @keydown.esc="closeModal">
    <div class="flex max-lg:flex-col p-4">
      <div class="flex flex-col lg:w-[50%]">
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
        </div>
        <div class="flex gap-4 mt-4">
          <div class="flex flex-col w-full">
            <label class="mb-1">Fit</label>
            <Dropdown :label="'Sélectionner un ajustement'" :options="objectFitOptions" v-model="localObjectFit"
              :isOpen="openDropdown === 'fit'" isFiltrable @close="openDropdown = null" @open="openDropdown = 'fit'" />
          </div>
          <div class="flex flex-col w-full">
            <label class="mb-1">Position</label>
            <Dropdown :label="'Sélectionner une position'" :options="objectPositionOptions"
              v-model="localObjectPosition" :isOpen="openDropdown === 'position'" isFiltrable
              @close="openDropdown = null" @open="openDropdown = 'position'" />
          </div>
        </div>
        <div class="flex flex-col mt-4">
          <label class="mb-1">Largeur</label>
          <input type="range" min="0" max="100" v-model="localWidth" />
          <span>{{ localWidth }}%</span>
        </div>
        <div class="flex flex-col mt-4">
          <label class="mb-1">Hauteur</label>
          <input type="range" min="0" max="100" v-model="localHeight" />
          <span>{{ localHeight }}%</span>
        </div>
      </div>
      <div class="lg:w-[50%] h-96 p-10 ml-4">
        <div v-if="localFile && localFile.url" :style="{ width: localWidth + '%', height: localHeight + '%' }">
          <img :src="localFile.url" :style="{ width: localWidth + '%', height: localHeight + '%' }"
            :class="imageClass" />
        </div>
        <div v-else class="flex flex-col items-center justify-center border dark:border-gray-600" :class="imageClass">
          <p class="text-center text-sm">Aucun fichier sélectionné</p>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-6">
      <Button label="Enregistrer" :level="1" @click.prevent="save" />
      <Button label="Annuler" :level="3" class="ml-4" @click.prevent="closeModal" />
    </div>
  </Modal>
</template>

<script>
export default {
  name: "ImageEditor",
  emits: ["save", "close", "file-selected"],
  props: {
    buttonLabel: { type: String, default: "Ajouter une image" },
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
      default: "center",
    },
    objectFit: {
      type: String,
      default: "contain",
    },
    width: {
      type: String,
      default: "50",
    },
    height: {
      type: String,
      default: "50",
    },
  },
  data() {
    return {
      openModal: false,
      localFile: this.initialFile
        ? {
          ...this.initialFile,
          url: this.initialFile.url || URL.createObjectURL(this.initialFile),
        }
        : null,
      localShadow: this.shadow,
      localRounded: this.rounded,
      localObjectFit: this.objectFit,
      localObjectPosition: this.objectPosition,
      objectPositions: [
        "object-center",
        "object-top",
        "object-bottom",
        "object-left",
        "object-right",
        "object-left-top",
        "object-right-top",
        "object-left-bottom",
        "object-right-bottom",
      ],
      objectFits: [
        "object-cover",
        "object-contain",
        "object-fill",
        "object-none",
        "object-scale-down",
      ],
      openDropdown: null,
      localWidth: this.width,
      localHeight: this.height,
    };
  },
  computed: {
    imageClass() {
      let classes = `object-${this.localObjectFit} object-${this.localObjectPosition} w-full h-full`;
      if (this.localShadow) classes += " shadow-lg";
      if (this.localRounded) classes += " rounded-2xl";
      return classes;
    },
    objectFitOptions() {
      return this.objectFits.map((fit) => ({
        label: fit.replace("object-", ""),
        value: fit.replace("object-", ""),
      }));
    },
    objectPositionOptions() {
      return this.objectPositions.map((position) => ({
        label: position.replace("object-", ""),
        value: position.replace("object-", ""),
      }));
    },
  },
  methods: {
    handleFileSelection(fileData) {
      if (fileData.file) {
        this.localFile = {
          ...fileData,
          url: URL.createObjectURL(fileData.file),
        };

        this.$emit("file-selected", {
          file: fileData.file,
          options: {
            shadow: this.localShadow,
            rounded: this.localRounded,
            position: this.localObjectPosition,
            fit: this.localObjectFit,
            width: this.localWidth,
            height: this.localHeight
          },
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
        width: this.localWidth,
        height: this.localHeight
      });
      this.closeModal();
    },
    closeModal() {
      this.openModal = false;
      this.$emit("close");
      this.closeDropdown();
    },
    closeDropdown() {
      this.openDropdown = null;
    },
  },
};
</script>
