<template>
  <button
    class="hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-lg w-full rounded-lg hover:shadow-md transition-all duration-500 cursor-pointer font-prompt dark:brightness-75 hover:brightness-95">
    <div class="rounded-lg flex flex-col">
    <p class="bg-gray-100 dark:bg-gray-800 w-full h-40 flex flex-col justify-center rounded-t-lg" v-if="!config.imgHero && !config.imgArg">{{ config.configName }}</p>
      <img v-else :src="config.imgHero || config.imgArg"
        class="w-full h-40 object-cover mr-2 rounded-t-lg" />
      <div class="p-4 border-t">
        <h2 class="flex">Config : {{ config.configName }}</h2>
        <div class="flex">
          <p>Application : {{ config.appName }}</p>
        </div>
        <div class="flex">
          <p class="text-xs">Date de création : {{ formattedCreatedAt }}</p>
        </div>
      </div>
    </div>
  </button>
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
