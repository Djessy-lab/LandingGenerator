<template>
  <div :class="['lg:h-[80vh]', colorMode.value === 'dark' ? 'bg-gray-900' : '']">
    <h2 class="text-3xl font-bold text-center py-10 dark:text-white">Tarifs</h2>
    <div class="flex justify-center max-lg:flex-col max-lg:items-center lg:mt-10 px-10">
      <div v-for="(price, index) in pricing"
        :class="[`shadow-lg ${price.up ? '-translate-y-2 shadow-2xl' : ''} rounded-lg w-80 max-lg:h-[30%] max-lg:w-[100%] h-96 p-10 lg:mr-4 max-lg:mt-10`,
                 colorMode.value === 'dark' ? 'bg-gray-800 text-white' : gradientClass]">
        <h4 class="lg:text-2xl font-bold font-amsterdam text-center">{{ price.title }}</h4>
        <p class="text-center text-4xl font-bold mt-5">{{ price.price }}€ <span class="font-normal text-xs">/ {{ price.duration }}</span></p>
        <div class="mt-6">
          <ul>
            <li v-for="feature in price.features" class="max-lg:text-center mt-2 max-lg:text-sm">
              <span>✅</span> {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pricing',
  setup() {
    const colorMode = useColorMode()
    return { colorMode }
  },
  props: {
    color: { type: String, default: "blue" },
    pricing: { type: Array, default: () => [] },
  },
  computed: {
    gradientClass() {
      const colorClasses = {
        blue: 'bg-gradient-to-b from-blue-100 to-blue-200',
        red: 'bg-gradient-to-b from-red-100 to-red-200',
        green: 'bg-gradient-to-b from-green-100 to-green-200',
        yellow: 'bg-gradient-to-b from-yellow-100 to-yellow-200',
        emerald: 'bg-gradient-to-b from-emerald-100 to-emerald-200',
        sky: 'bg-gradient-to-b from-sky-100 to-sky-200',
        rose: 'bg-gradient-to-b from-rose-100 to-rose-200',
        slate: 'bg-gradient-to-b from-slate-100 to-slate-200',
        pink: 'bg-gradient-to-b from-pink-100 to-pink-200',
        orange: 'bg-gradient-to-b from-orange-100 to-orange-200',
        neutral: 'bg-gradient-to-b from-neutral-100 to-neutral-200',
        stone: 'bg-gradient-to-b from-stone-100 to-stone-200',
        amber: 'bg-gradient-to-b from-amber-100 to-amber-200',
        lime: 'bg-gradient-to-b from-lime-100 to-lime-200',
        teal: 'bg-gradient-to-b from-teal-100 to-teal-200',
        cyan: 'bg-gradient-to-b from-cyan-100 to-cyan-200',
        indigo: 'bg-gradient-to-b from-indigo-100 to-indigo-200',
        violet: 'bg-gradient-to-b from-violet-100 to-violet-200',
        purple: 'bg-gradient-to-b from-purple-100 to-purple-200',
        fuchsia: 'bg-gradient-to-b from-fuchsia-100 to-fuchsia-200',
      };
      return colorClasses[this.color] || colorClasses['blue'];
    },
  }
}
</script>
