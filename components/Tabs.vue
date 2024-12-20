<template>
  <div
    class="rounded-lg shadow-xl w-full h-auto bg-neutral-100 dark:bg-slate-700"
  >
    <div class="flex flex-col">
      <div class="flex shadow-md">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="flex items-center gap-4 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-t-lg transition-all duration-600 cursor-pointer"
        >
          <input
            type="radio"
            name="tabs"
            :id="tab.value"
            :value="tab.value"
            v-model="activeTab"
            class="hidden"
          />
          <label
            :for="tab.value"
            class="text-lg font-bold cursor-pointer p-3"
            :class="{
              'text-slate-900 dark:text-slate-100 border-b-2 border-slate-900 dark:border-white':
                activeTab === tab.value,
              'text-gray-500 dark:text-slate-900': activeTab !== tab.value,
            }"
          >
            {{ tab.label }}
          </label>
        </div>
      </div>
      <transition :name="transitionName" mode="out-in">
        <div :key="activeTab">
          <slot :name="activeTab" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    tabs: { type: Array, default: () => [] },
  },
  data() {
    return {
      activeTab: this.tabs.length > 0 ? this.tabs[0].value : "",
      transitionName: "slide-left",
    };
  },
  watch: {
    activeTab(newVal, oldVal) {
      this.transitionName =
        this.tabs.findIndex((tab) => tab.value === newVal) >
        this.tabs.findIndex((tab) => tab.value === oldVal)
          ? "slide-left"
          : "slide-right";
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
