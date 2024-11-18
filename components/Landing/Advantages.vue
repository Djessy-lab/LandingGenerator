<template>
  <div :class="[`lg:h-[70vh]`, colorMode.value === 'dark' ? 'bg-gray-900' : gradientClass]">
    <h2 class="text-3xl font-bold text-center p-12" :class="colorMode.value === 'dark' ? 'text-white' : 'text-black'">Pourquoi utiliser {{ appName }} ?</h2>
    <div class="flex justify-center max-lg:flex-col max-lg:items-center px-10 lg:mt-10 max-lg:mb-20">
      <div v-for="(advantage, index) in advantages" :key="index"
        :class="[`shadow-lg rounded-lg w-96 max-lg:h-[30%] max-lg:w-[100%] max-lg:overflow-scroll p-10 lg:mr-10 max-lg:mt-10 transition-transform duration-700 hover:-translate-y-2`,
                 colorMode.value === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100']">
        <h3 class="text-2xl font-amsterdam text-center" :class="colorMode.value === 'dark' ? 'text-gray-200' : 'text-cyan-900'">{{ advantage.title }}</h3>
        <p class="mt-2 text-center">{{ advantage.text }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Advantages',
  setup() {
    const colorMode = useColorMode()
    return { colorMode }
  },
  props: {
    color: { type: String, default: "blue" },
    advantages: { type: Array, default: () => [] },
    appName: { type: String, default: "" },
  },
  computed: {
    gradientClass() {
      const colorClasses = {
        blue: 'bg-gradient-to-b from-blue-100 to-blue-0',
        red: 'bg-gradient-to-b from-red-100 to-red-0',
        green: 'bg-gradient-to-b from-green-100 to-green-0',
        yellow: 'bg-gradient-to-b from-yellow-100 to-yellow-0',
        emerald: 'bg-gradient-to-b from-emerald-100 to-emerald-0',
        sky: 'bg-gradient-to-b from-sky-100 to-sky-0',
        rose: 'bg-gradient-to-b from-rose-100 to-rose-0',
        slate: 'bg-gradient-to-b from-slate-100 to-slate-0',
        pink: 'bg-gradient-to-b from-pink-100 to-pink-0',
        orange: 'bg-gradient-to-b from-orange-100 to-orange-0',
        neutral: 'bg-gradient-to-b from-neutral-100 to-neutral-0',
        stone: 'bg-gradient-to-b from-stone-100 to-stone-0',
        amber: 'bg-gradient-to-b from-amber-100 to-amber-0',
        lime: 'bg-gradient-to-b from-lime-100 to-lime-0',
        teal: 'bg-gradient-to-b from-teal-100 to-teal-0',
        cyan: 'bg-gradient-to-b from-cyan-100 to-cyan-0',
        indigo: 'bg-gradient-to-b from-indigo-100 to-indigo-0',
        violet: 'bg-gradient-to-b from-violet-100 to-violet-0',
        purple: 'bg-gradient-to-b from-purple-100 to-purple-0',
        fuchsia: 'bg-gradient-to-b from-fuchsia-100 to-fuchsia-0',
        dark: 'bg-gray-900',
      };
      return colorClasses[this.color] || colorClasses['blue'];
    },
  }
}
</script>
