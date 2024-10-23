<template>
  <div class="shadow-lg h-20 rounded-lg dark:bg-gray-800 hover:shadow-md transition-all duration-300">
    <h2 class="text-xl font-amsterdam text-center">{{ config.configName }}</h2>
    <div class="ml-2">
      <p>{{ config.appName }}</p>
    </div>
    <div class="flex justify-end mr-2">
      <p class="text-xs">{{ formattedCreatedAt }}</p>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "ConfigCard",
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    formattedCreatedAt() {
      return dayjs(this.config.createdAt).format("DD/MM/YYYY");
    },
  },
};
</script>
