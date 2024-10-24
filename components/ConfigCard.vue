<template>
  <div
    class="shadow-lg p-4 rounded-lg dark:bg-gray-800 hover:shadow-md transition-all duration-300 cursor-pointer font-prompt">
    <h2 class="ml-2">Config : {{ config.configName }}</h2>
    <div class="ml-2">
      <p>Application : {{ config.appName }}</p>
    </div>
    <div class="flex justify-end mr-2">
      <p class="text-xs">Date de création : {{ formattedCreatedAt }}</p>
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
