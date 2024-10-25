<template>
  <div>
    <div class="z-10 lg:opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
      <button v-if="!viewOptions" @click="viewOptions = true">
        <Icon name="line-md:menu" class="text-black dark:text-white h-5 w-5 cursor-pointer" />
      </button>
    </div>

    <div v-if="viewOptions" class="z-20 flex mb-[.365rem] space-x-2 transition-all duration-500 ease-in-out">
      <button @click="viewOptions = false">
        <Icon name="line-md:close" class="text-black hover:text-gray-400 dark:text-white h-5 w-5" />
      </button>
      <button @click="deletConfig">
        <Icon name="lucide:trash-2" class="text-red-600 hover:text-red-800 dark:text-white h-5 w-5" />
      </button>
      <button @click="editConfig">
        <Icon name="line-md:pencil" class="text-blue-600 hover:text-blue-800 dark:text-white h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionsCard",
  emits: ["deleteConfig", "editConfig"],
  data() {
    return {
      viewOptions: false,
    };
  },
  methods: {
    deletConfig() {
      this.$emit('deleteConfig')
    },
    editConfig() {
      this.$emit('editConfig')
    }
  }
}
</script>
