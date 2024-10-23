<template>
  <div :class="colorMode.value === 'dark' ? 'bg-gray-900' : gradientClass">
    <header class="flex items-center justify-between p-4">
      <div class="text-xl font-bold font-mono" :class="colorMode.value === 'dark' ? 'text-gray-200' : 'text-black'"><a
          href="/">{{ appName }}</a></div>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="#testimonials" :class="colorMode.value === 'dark' ? 'text-gray-200' : linkClass">Avis</a></li>
          <li v-if="!userEmail">
            <a href="/login" :class="colorMode.value === 'dark' ? 'text-gray-200' : linkClass">Se connecter</a>
          </li>
          <li v-if="userEmail">
            <a href="" :class="colorMode.value === 'dark' ? 'text-gray-200' : linkClass" @click.prevent="logout">Se
              déconnecter</a>
          </li>
        </ul>
      </nav>
    </header>
    <section class="text-center py-12">
      <h1 class="text-4xl font-extrabold" :class="colorMode.value === 'dark' ? 'text-white' : 'text-gray-900'">
        {{ title }}
      </h1>
      <p class="mt-4 text-lg" :class="colorMode.value === 'dark' ? 'text-gray-300' : 'text-gray-600'">
        {{ description }}
      </p>
      <div v-if="!userEmail" class="mt-6">
        <button @click="goLogin"
          :class="[`max-w-32 min-w-32 px-4 py-2 rounded-lg shadow`, colorMode.value === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : buttonClass]">
          S'inscrire
        </button>
      </div>
      <div class="mt-8 sm:w-[80%] lg:w-[60%] mx-auto shadow-2xl rounded-2xl mb-10">
        <img :src="imgHero" class="rounded-2xl" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
  setup() {
    const colorMode = useColorMode()
    return { colorMode }
  },
  data() {
    return {
      userEmail: null,
    };
  },
  props: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    color: { type: String, default: "blue" },
    imgHero: { type: String, default: "" },
    appName: { type: String, default: "" },
  },
  created() {
    this.fetchUserEmail();
  },
  computed: {
    gradientClass() {
      const colorClasses = {
        blue: 'bg-gradient-to-b from-blue-200 to-blue-100 text-white',
        red: 'bg-gradient-to-b from-red-200 to-red-100 text-white',
        green: 'bg-gradient-to-b from-green-200 to-green-100 text-white',
        yellow: 'bg-gradient-to-b from-yellow-200 to-yellow-100 text-white',
        emerald: 'bg-gradient-to-b from-emerald-200 to-emerald-100 text-white',
        sky: 'bg-gradient-to-b from-sky-200 to-sky-100 text-white',
        rose: 'bg-gradient-to-b from-rose-200 to-rose-100 text-white',
        slate: 'bg-gradient-to-b from-slate-200 to-slate-100 text-white',
        pink: 'bg-gradient-to-b from-pink-200 to-pink-100 text-white',
        orange: 'bg-gradient-to-b from-orange-200 to-orange-100 text-white',
        neutral: 'bg-gradient-to-b from-neutral-200 to-neutral-100 text-white',
        stone: 'bg-gradient-to-b from-stone-200 to-stone-100 text-white',
        amber: 'bg-gradient-to-b from-amber-200 to-amber-100 text-white',
        lime: 'bg-gradient-to-b from-lime-200 to-lime-100 text-white',
        teal: 'bg-gradient-to-b from-teal-200 to-teal-100 text-white',
        cyan: 'bg-gradient-to-b from-cyan-200 to-cyan-100 text-white',
        indigo: 'bg-gradient-to-b from-indigo-200 to-indigo-100 text-white',
        violet: 'bg-gradient-to-b from-violet-200 to-violet-100 text-white',
        purple: 'bg-gradient-to-b from-purple-200 to-purple-100 text-white',
        fuchsia: 'bg-gradient-to-b from-fuchsia-200 to-fuchsia-100 text-white',
        dark: 'bg-gray-900',
      };
      return colorClasses[this.color] || colorClasses['blue'];
    },
    linkClass() {
      const colorClasses = {
        blue: 'text-blue-700',
        red: 'text-red-700',
        green: 'text-green-700',
        yellow: 'text-yellow-700',
        emerald: 'text-emerald-700',
        sky: 'text-sky-700',
        rose: 'text-rose-700',
        slate: 'text-slate-700',
        pink: 'text-pink-700',
        orange: 'text-orange-700',
        neutral: 'text-neutral-700',
        stone: 'text-stone-700',
        amber: 'text-amber-700',
        lime: 'text-lime-700',
        teal: 'text-teal-700',
        cyan: 'text-cyan-700',
        indigo: 'text-indigo-700',
        violet: 'text-violet-700',
        purple: 'text-purple-700',
        fuchsia: 'text-fuchsia-700',
        dark: 'text-white'
      };
      return colorClasses[this.color] || colorClasses['blue'];
    },
    buttonClass() {
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
        dark: 'bg-white text-black'
      };
      return colorClasses[this.color] || colorClasses['blue'];
    }
  },
  methods: {
    goLogin() {
      this.$router.push({ path: '/login', query: { color: this.color, appName: this.appName } });
    },
    setUserEmail(email) {
      this.userEmail = email;
    },
    async fetchUserEmail() {
      try {
        const token = localStorage.getItem("token");
        const response = await $fetch("/api/auth/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          this.userEmail = response.email;
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
      }
    },
    async logout() {
      try {
        const token = localStorage.getItem("token");
        const response = await $fetch("/api/auth/logout", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          localStorage.removeItem("token");
          this.userEmail = null;
          alert(response.message);
        }
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
      }
    },
  },
};
</script>
