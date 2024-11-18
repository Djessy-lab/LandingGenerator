<template>
  <div class="flex flex-col justify-center p-32 rounded-2xl shadow-xl bg-white">
    <h2 class="text-center text-xl mb-10">Se connecter avec un lien magique 🪄</h2>
    <input
      class="rounded-2xl border p-2 text-center mb-10 min-w-64"
      v-model="email"
      type="email"
      id="auth-email"
      placeholder="Entrez votre email"
    />
    <button
      :class="`${colorClass} text-white p-2 rounded-lg min-w-64`"
      @click="loginWithMagic"
    >
      Se connecter
    </button>
  </div>
</template>

<script>
export default {
  name: "Login",
  emits: ["authenticated"],
  data() {
    return {
      email: "",
    };
  },
  props: {
    color: { type: String, default: "blue" },
  },
  computed: {
    colorClass() {
      const colorClasses = {
        blue: "bg-blue-500",
        red: "bg-red-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        emerald: "bg-emerald-500",
        sky: "bg-sky-500",
        rose: "bg-rose-500",
        slate: "bg-slate-500",
        pink: "bg-pink-500",
        orange: "bg-orange-500",
        neutral: "bg-neutral-500",
        stone: "bg-stone-500",
        amber: "bg-amber-500",
        lime: "bg-lime-500",
        teal: "bg-teal-500",
        cyan: "bg-cyan-500",
        indigo: "bg-indigo-500",
        violet: "bg-violet-500",
        purple: "bg-purple-500",
        fuchsia: "bg-fuchsia-500",
        dark: "bg-gray-900 text-white",
      };
      return colorClasses[this.color] || colorClasses["blue"];
    },
  },
  methods: {
    async loginWithMagic() {
      try {
        const response = await $fetch("/api/auth/login", {
          method: "POST",
          body: { email: this.email },
        });

        if (response.status === 200) {
          localStorage.setItem("token", response.token);
          alert("Vérifiez votre email pour le lien magique.");
          this.$emit("authenticated", this.email);
          this.email = "";
        } else {
          console.error("Erreur:", response.message);
        }
      } catch (error) {
        console.error("Échec de la connexion:", error);
      }
    },
  },
};
</script>
