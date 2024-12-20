<template>
  <div class="h-full w-full flex flex-col">
    <div class="w-full">
      <div class="flex justify-center my-10">
        <a
          v-if="repoUrl"
          :href="repoUrl"
          target="_blank"
          class="text-center text-slate-900 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >Lien vers le dépôt</a
        >
      </div>
      <Button
        v-if="!isLoading"
        @click="createRepo"
        label="Créer votre dépôt de code"
        :level="4"
        class="w-[80%] mx-auto mb-4"
      />
      <Button
        v-else-if="isLoading"
        label="Création du dépôt en cours..."
        :level="3"
        class="w-[80%] mx-auto mb-4"
      />
      <div class="flex justify-center mt-8">
        <GithubLoader :isLoading="isLoading" />
      </div>
    </div>
    <!-- <div class="w-full">
      <Button
        v-if="deployButton"
        :isDisabled="isLoading"
        @click="deployRepo"
        label="Déployer en ligne"
        :level="4"
        class="w-[80%] mx-auto"
      />
    </div> -->
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
