<template>
  <div>
    <div class="w-full">
      <Button @click="createRepo" label="Créer votre dépôt de code" :level="4" class="w-[80%] mx-auto mb-4" />
    </div>
    <div class="w-full">
      <Button @click="deployRepo" label="Déployer en ligne" :level="4" class="w-[80%] mx-auto" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DeployCard",
  emits: ['createRepo', 'deployRepo'],
  methods: {
    createRepo(){
      this.$emit('createRepo')
    },
    deployRepo(){
      this.$emit('deployRepo')
    }
  }
};
</script>
