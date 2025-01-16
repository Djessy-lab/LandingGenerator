<template>
  <div class="w-full">
    <div class="flex flex-col items-center my-10">
      <Icon :name="!repoExists
          ? 'lineicons:github-original'
          : 'vscode-icons:file-type-light-vercel'
        " class="w-20 h-20 text-black dark:text-white" />
      <a v-if="repoUrl" :href="repoUrl" target="_blank"
        class="text-center mt-4 underline text-slate-900 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">Lien
        vers le dépôt</a>
    </div>
    <Button v-if="!isLoading && !repoExists" @click="createRepo" label="Créer votre dépôt de code" :level="1"
      class="w-[60%] mx-auto mb-4" />
    <Button v-else-if="isLoading" label="Création du dépôt en cours..." :level="3" class="w-[80%] mx-auto mb-4" />
    <div v-if="repoExists" class="mt-4">
      <Button @click="deployRepo" label="Déployer sur Vercel" :level="1" class="w-[80%] mx-auto" />
    </div>
    <div class="flex justify-center mt-8">
      <GithubLoader :isLoading="isLoading" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DeployCard",
  emits: ["createRepo", "deployRepo"],
  props: {
    isLoading: { type: Boolean, default: false },
    deployButton: { type: Boolean, default: false },
    repoUrl: { type: String, default: "" },
    repoExists: { type: Boolean, default: false },
  },
  methods: {
    createRepo() {
      this.$emit("createRepo");
    },
    deployRepo() {
      this.$emit("deployRepo");
    },
  },
};
</script>
