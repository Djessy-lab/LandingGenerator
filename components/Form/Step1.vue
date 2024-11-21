<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">Informations de base</h3>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div v-for="(value, key) in baseFields" :key="key" class="flex flex-col w-full"
        :class="{ 'md:col-span-2': value.type === 'textarea' }">
        <label class="font-semibold" :for="key">{{ value.label }}:</label>
        <FileUpload
          v-if="key === 'imgHero' || key === 'imgArg'"
          label="Ajouter une image"
          :initialFile="getFileObject(localConfig[key])"
          @file-selected="(fileData) => handleFileSelection(key, fileData)"
        />
        <div v-if="(key === 'imgHero' || key === 'imgArg') && localConfig[key]" class="flex space-x-4 mt-2">
          <div class="flex items-center">
            <input
              type="checkbox"
              :id="`shadow-${key}`"
              v-model="localConfig[`${key}Shadow`]"
              @change="updateConfig"
            />
            <label :for="`shadow-${key}`" class="ml-2">Ajouter une ombre</label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              :id="`rounded-${key}`"
              v-model="localConfig[`${key}Rounded`]"
              @change="updateConfig"
            />
            <label :for="`rounded-${key}`" class="ml-2">Arrondir les coins</label>
          </div>
        </div>
        <ColorPicker
          v-else-if="key === 'color'"
          v-model="localConfig[key]"
          @update:modelValue="updateConfig"
        />
        <input
          v-else-if="value.type !== 'textarea' && key !== 'imgHero' && key !== 'imgArg'"
          :id="key"
          :type="value.type"
          :placeholder="value.placeholder"
          class="shadow rounded-lg p-2 mt-1 w-full bg-white dark:bg-slate-700"
          v-model="localConfig[key]"
          @input="updateConfig"
          required
        />
        <textarea
          v-else-if="value.type === 'textarea'"
          :id="key"
          :placeholder="value.placeholder"
          class="shadow rounded-lg p-2 mt-1 w-full bg-white dark:bg-slate-700"
          v-model="localConfig[key]"
          @input="updateConfig"
          required
          rows="2"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step1",
  emits: ['file-selected', 'update-config'],
  props: {
    config: Object,
    configName: String,
  },
  data() {
    return {
      localConfig: {
        ...this.config,
        configName: this.configName,
        imgHeroShadow: this.config.imgHeroShadow || false,
        imgHeroRounded: this.config.imgHeroRounded || false,
        imgArgShadow: this.config.imgArgShadow || false,
        imgArgRounded: this.config.imgArgRounded || false,
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
        color: {
          label: "Couleur",
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
    getFileObject(url) {
      if (!url) return null;
      return { name: url.split('/').pop(), url };
    },
    handleFileSelection(key, { file, fileName }) {
      if (file) {
        this.localConfig[key] = URL.createObjectURL(file);
      } else {
        this.localConfig[key] = '';
      }
      this.$emit('file-selected', { key, file, fileName });
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
