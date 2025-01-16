<template>
  <div>
    <Toast
      v-model="showToast"
      type="confirm"
      title="Confirmation"
      message="Le fond quadrillé va supprimer la couleur actuelle. Voulez-vous continuer ?"
      :onConfirm="confirmSquaredChange"
      :onCancel="cancelSquaredChange"
    />
    <h3 class="text-xl font-semibold mb-4">Informations de base</h3>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div v-for="(value, key) in baseFields" :key="key" class="flex flex-col w-full"
        :class="{ 'md:col-span-2': value.type === 'textarea' || key === 'color' }">
        <label class="font-semibold" :for="key">{{ value.label }}:</label>
        <ImageEditor v-if="key === 'imgHero' || key === 'imgArg'"
          :buttonLabel="localConfig[key] ? 'Modifier l\'image' : 'Ajouter une image'"
          :initialFile="getFileObject(localConfig[key])" :shadow="localConfig[`${key}Shadow`]"
          :rounded="localConfig[`${key}Rounded`]" :objectPosition="localConfig[`${key}Position`]"
          :objectFit="localConfig[`${key}Fit`]" :width="localConfig[`${key}Width`] || '50'"
          :height="localConfig[`${key}Height`] || '50'" @save="(data) => handleImageSave({ ...data, field: key })"
          @file-selected="(fileData) => handleFileSelection(key, fileData)" />
        <div v-else-if="key === 'color'" class="flex items-center justify-between mt-1">
          <div class="flex-1 flex justify-start">
            <ColorPicker v-model="localConfig[key]" @update:modelValue="updateConfig" />
            <button v-if="localConfig.color" @click.prevent="resetColor" class="ml-2">
              <Icon name="line-md:close" class="text-black hover:text-gray-400 dark:text-white h-5 w-5" />
            </button>
          </div>
          <div class="flex-1 flex justify-center">
            <span class="text-gray-500 dark:text-gray-400 font-medium">OU</span>
          </div>
          <div class="flex-1 flex justify-end items-center space-x-3">
            <button
              @click.prevent="handleSquaredChange"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none"
              :class="localConfig.squared ? 'bg-slate-700' : 'bg-gray-200 dark:bg-gray-600'"
            >
              <span
                class="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                :class="localConfig.squared ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
            <label class="cursor-pointer" @click="handleSquaredChange">Fond quadrillé</label>
          </div>
        </div>
        <div v-else-if="key === 'buttonAndCardsColor'" class="mt-1">
          <ColorPicker v-model="localConfig[key]" @update:modelValue="updateConfig" />
        </div>
        <input v-else-if="
          value.type !== 'textarea' && key !== 'imgHero' && key !== 'imgArg' && key !== 'squared'
        " :id="key" :type="value.type" :placeholder="value.placeholder"
          class="shadow rounded-lg p-2 mt-1 w-full bg-white dark:bg-slate-700" v-model="localConfig[key]"
          @input="updateConfig" required />
        <textarea v-else-if="value.type === 'textarea'" :id="key" :placeholder="value.placeholder"
          class="shadow rounded-lg p-2 mt-1 w-full bg-white dark:bg-slate-700" v-model="localConfig[key]"
          @input="updateConfig" required rows="2"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '../Toast.vue';

export default {
  name: "Step1",
  components: {
    Toast
  },
  emits: ["file-selected", "update-config"],
  props: {
    config: Object,
    configName: String,
  },
  data() {
    return {
      showToast: false,
      localConfig: {
        ...this.config,
        configName: this.configName,
        imgHeroShadow: this.config.imgHeroShadow || false,
        imgHeroRounded: this.config.imgHeroRounded || false,
        imgArgShadow: this.config.imgArgShadow || false,
        imgArgRounded: this.config.imgArgRounded || false,
        imgHeroPosition: this.config.imgHeroPosition || "center",
        imgHeroFit: this.config.imgHeroFit || "contain",
        imgArgPosition: this.config.imgArgPosition || "center",
        imgArgFit: this.config.imgArgFit || "contain",
        imgHeroWidth: this.config.imgHeroWidth || '50',
        imgHeroHeight: this.config.imgHeroHeight || '50',
        imgArgWidth: this.config.imgArgWidth || '50',
        imgArgHeight: this.config.imgArgHeight || '50',
        squared: this.config.squared,
        buttonAndCardsColor: this.config.buttonAndCardsColor || '',
      },
      baseFields: {
        configName: {
          label: "Nom de la configuration",
          type: "text",
          placeholder: "Ma configuration",
        },
        appName: {
          label: "Nom de l'application",
          type: "text",
          placeholder: "Mon application",
        },
        titleHero: {
          label: "Titre Hero",
          type: "text",
          placeholder: "Mon titre",
        },
        buttonAndCardsColor: {
          label: "Couleur ",
          type: "color",
        },
        color: {
          label: "Couleur de fond",
          type: "text",
          placeholder: "green",
        },
        imgHero: {
          label: "Image Hero",
        },
        imgArg: {
          label: "Image Arguments",
        },
        descriptionHero: {
          label: "Description Hero",
          type: "textarea",
          placeholder: "Description de ma super application...",
        },
      },
    };
  },
  methods: {
    handleImageSave({ file, shadow, rounded, position, fit, field, width, height }) {
      const keyPrefix = field === "imgHero" ? "imgHero" : "imgArg";
      this.localConfig[`${keyPrefix}`] = file ? file.url : null;
      this.localConfig[`${keyPrefix}Shadow`] = shadow;
      this.localConfig[`${keyPrefix}Rounded`] = rounded;
      this.localConfig[`${keyPrefix}Position`] = position;
      this.localConfig[`${keyPrefix}Fit`] = fit;
      this.localConfig[`${keyPrefix}Width`] = width;
      this.localConfig[`${keyPrefix}Height`] = height;

      this.updateConfig();
    },
    getFileObject(url) {
      if (!url) return null;
      return { name: url.split("/").pop(), url };
    },
    handleFileSelection(key, { file, fileName }) {
      if (file) {
        this.localConfig[key] = URL.createObjectURL(file);
      } else {
        this.localConfig[key] = "";
      }
      this.$emit("file-selected", { key, file, fileName });
    },
    handleSquaredChange() {
      if (!this.localConfig.squared && this.localConfig.color) {
        this.showToast = true;
      } else {
        this.localConfig.squared = !this.localConfig.squared;
        this.updateConfig();
      }
    },
    confirmSquaredChange() {
      event.preventDefault();
      this.localConfig.squared = true;
      this.localConfig.color = '';
      this.showToast = false;
      this.updateConfig();
    },
    cancelSquaredChange() {
      event.preventDefault();
      this.localConfig.squared = false;
      this.showToast = false;
      this.updateConfig();
    },
    resetColor() {
      this.localConfig.color = '';
      this.updateConfig();
    },
    updateConfig() {
      this.$emit("update-config", {
        config: { ...this.localConfig },
        configName: this.localConfig.configName,
      });
    },
  },
};
</script>
