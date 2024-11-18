<template>
  <div :class="[`h-[50vh] flex items-center justify-center`, colorMode.value === 'dark' ? 'bg-gray-900' : gradientClass]">
    <section id="get-email" class="flex flex-col items-center">
      <div class="text-center mb-10">
        <h3 class="text-3xl dark:text-white">S'inscrire pour l'accès anticipé</h3>
        <p class="mt-2 dark:text-gray-300">Inscrivez-vous aujourd'hui et bénéficiez de 40% de réduction</p>
      </div>
      <div class="w-full flex justify-center">
        <input v-model="email" type="email" id="get-email" placeholder="votre.meilleur@email.com"
          class="w-80 rounded-2xl p-1 text-center dark:bg-gray-700 dark:text-white">
      </div>
      <div class="w-full flex justify-center mt-4">
        <button @click="subscribe" :class="[`w-80 rounded-2xl p-1 text-white`, colorMode.value === 'dark' ? 'bg-gray-600 hover:bg-gray-700' : buttonClass]">S'inscrire</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'GetEmail',
  setup() {
    const colorMode = useColorMode()
    return { colorMode }
  },
  data() {
    return {
      email: '',
    };
  },
  props: {
    color: { type: String, default: "blue" },
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
        dark: 'bg-gray-900 text-white dark:bg-gray-800',
      };
      return colorClasses[this.color] || colorClasses['blue'];
    },
    buttonClass(){
      const colorClasses = {
        blue: 'bg-blue-600 hover:bg-blue-700',
        red: 'bg-red-600 hover:bg-red-700',
        green: 'bg-green-600 hover:bg-green-700',
        yellow: 'bg-yellow-600 hover:bg-yellow-700',
        emerald: 'bg-emerald-600 hover:bg-emerald-700',
        sky: 'bg-sky-600 hover:bg-sky-700',
        rose: 'bg-rose-600 hover:bg-rose-700',
        slate: 'bg-slate-600 hover:bg-slate-700',
        pink: 'bg-pink-600 hover:bg-pink-700',
        orange: 'bg-orange-600 hover:bg-orange-700',
        neutral: 'bg-neutral-600 hover:bg-neutral-700',
        stone: 'bg-stone-600 hover:bg-stone-700',
        amber: 'bg-amber-600 hover:bg-amber-700',
        lime: 'bg-lime-600 hover:bg-lime-700',
        teal: 'bg-teal-600 hover:bg-teal-700',
        cyan: 'bg-cyan-600 hover:bg-cyan-700',
        indigo: 'bg-indigo-600 hover:bg-indigo-700',
        violet: 'bg-violet-600 hover:bg-violet-700',
        purple: 'bg-purple-600 hover:bg-purple-700',
        fuchsia: 'bg-fuchsia-600 hover:bg-fuchsia-700',
        dark: 'bg-gray-600 hover:bg-gray-700',
      };
      return colorClasses[this.color] || colorClasses['blue'];
    }
  },
  methods: {
    async subscribe() {
      try {
        const response = await $fetch('/api/subscribe', {
          method: 'POST',
          body: { email: this.email },
        });

        if (response.message === "Vous êtes déjà inscrit avec cet email.") {
          alert("Vous êtes déjà inscrit avec cet email.");
        } else {
          alert(response.message);
          this.email = '';
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        alert("Une erreur s'est produite lors de l'inscription.");
      }
    },
  },
};
</script>
