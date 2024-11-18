<template>
  <div>
    <h3 class="text-xl font-semibold mb-4">Informations de base</h3>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div v-for="(value, key) in baseFields" :key="key" class="flex flex-col w-full" :class="{ 'md:col-span-2': value.type === 'textarea' }">
        <label class="font-semibold" :for="key">{{ value.label }}:</label>
        <input
          v-if="value.type !== 'textarea'"
          :id="key"
          :type="value.type"
          :placeholder="value.placeholder"
          class="border rounded-lg p-2 mt-1 w-full dark:text-black"
          v-model="localConfig[key]"
          @input="updateConfig"
          required
        />
        <textarea
          v-else
          :id="key"
          :placeholder="value.placeholder"
          class="border rounded-lg p-2 mt-1 w-full dark:text-black"
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
  props: {
    config: Object,
    configName: String,
  },
  data() {
    return {
      localConfig: {
        ...this.config,
        configName: this.configName,
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
        color: { label: "Couleur", type: "text", placeholder: "green" },
        imgHero: {
          label: "Image Hero",
          type: "text",
          placeholder: "https://...",
        },
        imgArg: {
          label: "Image Arguments",
          type: "text",
          placeholder: "https://...",
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
    updateConfig() {
      this.$emit("update-config", {
        config: { ...this.localConfig },
        configName: this.localConfig.configName,
      });
    },
  },
};
</script>
